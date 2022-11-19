require('dotenv').config();
const Photo = require('../models/Photo');
const fs = require('fs');
const { Storage } = require('@google-cloud/storage');

const {
    allowedProgrammingLanguages, // array
} = require('../utilities/conditionalVariables');

const {
    getUserById,
    checkUserAuth,
    base64ToImageWithPath

} = require('./users.controller');
const path = require('path');
/**********************/
// .env variables
const CODE_TEXT_STORAGE_PATH = process.env.CODE_TEXT_STORAGE_PATH;

const CODE_TEXT_CLOUD_URL = process.env.CODE_TEXT_CLOUD_URL;

const CODE_IMAGE_STORAGE_PATH = process.env.CODE_IMAGE_STORAGE_PATH;

const CODE_IMAGE_CLOUD_URL = process.env.CODE_IMAGE_CLOUD_URL;

const GOOGLE_FILE_PATH = process.env.GOOGLE_FILE_PATH;

const PROJECT_ID = process.env.PROJECT_ID;

const BUCKET_NAME = process.env.BUCKET_NAME;

const GET_CODE_IMAGE_CLOUD_URL = process.env.GET_CODE_IMAGE_CLOUD_URL;
/**********************/

const storage = new Storage({
    keyFilename: GOOGLE_FILE_PATH,
    projectId: PROJECT_ID
   });

const codeCamBucket = storage.bucket(BUCKET_NAME);

const getPhotosByUserId = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userId = req.params.userId;
        if(!userId) {
            throw {message: 'User id is required'};
        }
        const checkAuth = await checkUserAuth(token, userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        const photos = await Photo.find({userId: userId}).sort([['updatedAt', 'desc']]);

        res.status(200).send({error: false, photos: photos});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

const savePhoto = async (req, res) => {
    try {
        const {
            base64Photo,
            codeTextContent,
            programmingLanguage,
            snippetName,
            userId,
        } = req.body;

        if(!base64Photo || !codeTextContent || !snippetName || !userId, !programmingLanguage) {
            throw {message: 'Incomplete request'};
        }
        const token = req.headers.authorization;
        const checkAuth = await checkUserAuth(token, userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        if(!allowedProgrammingLanguages.includes(programmingLanguage.toUpperCase())) {
            throw {message: 'Unsupported Programming Language'};
        }

        const user = await getUserById(userId);
        if(!user) {
            throw {message: 'User Not Found'};
        }

        const getPhotoUrl = await base64ToImageWithPath(userId, base64Photo, snippetName, CODE_IMAGE_STORAGE_PATH, CODE_IMAGE_CLOUD_URL, GET_CODE_IMAGE_CLOUD_URL);

        const getCodeUrl = writeInFile(userId, snippetName, codeTextContent);

        const photo = new Photo();
        photo.photoUrl = getPhotoUrl;
        photo.codeUrl = getCodeUrl;
        photo.programmingLanguage = programmingLanguage.toUpperCase();
        photo.snippetName = snippetName;
        photo.userId = userId;
        await photo.save();
        res.status(201).send({error: false, photo: photo, message: 'Photo saved successfully'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message, where: "here"});
    }
}

const getPhotoById = async (req, res) => {
    try {
        const photoId = req.params.photoId;
        if(!photoId) {
            throw {message: 'Photo id is required'};
        }

        let photo = await Photo.findById(photoId).lean();
        if(!photo) {
            throw {message: 'No photo is found'};
        }
        const token = req.headers.authorization;
        const checkAuth = await checkUserAuth(token, photo.userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        const fileToRead = photo.codeUrl;
        const codeText = await readFromFile(fileToRead);
        photo = {...photo, codeText};
        res.status(200).send({error: false, photo: photo});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

const editPhotoById = async (req, res) => {
    try {
        const photoId = req.params.photoId;
        const {
            codeTextContent,
            programmingLanguage,
            snippetName,
        } = req.body;

        if(!photoId || !codeTextContent || !programmingLanguage || !snippetName) {
            throw {message: 'Incomplete request'};
        }

        if(!allowedProgrammingLanguages.includes(programmingLanguage.toUpperCase())) {
            throw {message: 'Unsupported Programming Language'};
        }
        const photo = await Photo.findById(photoId);
        if(!photo) {
            throw {message: 'No Photo found'}
        }
        const token = req.headers.authorization;
        const checkAuth = await checkUserAuth(token, photo.userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        //create new file.txt
        const getCodeUrl = writeInFile(photo.userId, snippetName, codeTextContent);
        // delete old file.txt
        const localDestination = photo.codeUrl.split(`${BUCKET_NAME}/`)[1];
        deleteFile(path.join(__dirname, `../storage/${localDestination}`));

        // assign new file.txt to photo
        photo.codeUrl = getCodeUrl;
        photo.programmingLanguage = programmingLanguage.toUpperCase();
        photo.snippetName = snippetName;
        await photo.save();
        res.status(200).send({error: false, photo: photo});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

const deletePhoto = async (req, res) => {
    try {
        const photoId = req.params.photoId;
        if(!photoId) {
            throw {message: 'Photo id is required'};
        }
        const photo = await Photo.findById(photoId);
        if(!photo) {
            throw {message: 'No Photo found'}
        }
        const token = req.headers.authorization;
        const checkAuth = await checkUserAuth(token, photo.userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        await photo.delete();
        res.status(200).send({error: false, message: 'Photo deleted successfully'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}


// should be used in try catch block
const writeInFile = (userId, snippet, textContent) => {
    // replace '/' and '\' by '' to not create new route
    const fileName = `${snippet.replace(/\\|\s|\//g, '')}_${Date.now()}.txt`;
    const path = `${CODE_TEXT_STORAGE_PATH}/${userId}`;
    if(!fs.existsSync(path)) {
        fs.mkdir(
            path, 
            (error) => {
                throw {message: error};
            });
    }

    const completePath = `${path}/${fileName}`;
    fs.writeFile(completePath, textContent, 
        (error) => {
            if(error) {
                throw {message: error};
            }
        });
    
    const destination = `${CODE_TEXT_CLOUD_URL.split(`${BUCKET_NAME}/`)[1]}/${userId}/${fileName}`;

    codeCamBucket.upload(completePath, {
        destination: destination
    });

    const url = `${CODE_TEXT_CLOUD_URL}/${userId}/${fileName}`;
    return url;
}

const readFromFile = async (codeUrl) => {
    const path = codeUrl.split('/');
    id = path[path.length-2];
    textName = path[path.length-1];

    const destination = `${CODE_TEXT_STORAGE_PATH}/${id}/${textName}`
    const srcFileName = codeUrl.split(`${BUCKET_NAME}/`)[1];
    const options = {
        destination: destination,
        srcFileName: srcFileName
    }
    await storage
        .bucket(BUCKET_NAME)
        .file(srcFileName)
        .download(options);
        

    const content = fs.readFileSync(destination, 'utf-8', 
    (error) => {
        if(error) {
            throw {message: error};
        }
    });
    
    return content.toString();
}



const deleteFile = (filePath) => {
    if(fs.statSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}

module.exports = {
    savePhoto,
    base64ToImageWithPath,
    getPhotosByUserId,
    getPhotoById,
    editPhotoById,
    deletePhoto,
    readFromFile
}