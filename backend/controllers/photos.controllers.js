require('dotenv').config();
const jwt = require('jsonwebtoken');
const Photo = require('../models/Photo');
const User = require('../models/User');
const fs = require('fs');

const {
    photoExtensions, // array
    allowedProgrammingLanguages, // array
} = require('../utilities/conditionalVariables');

/**********************/
// .env variables
const CODE_TEXT_STORAGE_PATH = process.env.CODE_TEXT_STORAGE_PATH;

const CODE_IMAGE_STORAGE_PATH = process.env.CODE_IMAGE_STORAGE_PATH;

const CODE_IMAGE_URL = process.env.CODE_IMAGE_URL;

const USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;
/**********************/

const checkUserAuth = async (token, id) => {
    const decoded = jwt.verify(token.split(' ')[1], USER_ACCESS_TOKEN);
    if(!decoded) {
        throw {message: "User not found"};
    }
    if(decoded.userId == id) return true;

    return false;
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if(!user) {
            return false;
        }
        return user;
    } catch (error) {
        return false;
    }
}

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

        if(!getUserById(userId)) {
            throw {message: 'User Not Found'};
        }

        const getPhotoUrl = base64ToImageWithPath(userId, base64Photo, snippetName, CODE_IMAGE_STORAGE_PATH, CODE_IMAGE_URL);

        const getCodeUrl = writeInFile(userId, snippetName, codeTextContent);

        const photo = new Photo();
        photo.photoUrl = getPhotoUrl;
        photo.codeUrl = getCodeUrl;
        photo.programmingLanguage = programmingLanguage.toUpperCase();
        photo.snippetName = snippetName;
        photo.userId = userId;
        await photo.save();
        res.status(201).send({error: false, message: 'Photo saved successfully'});
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
        const codeText = readFromFile(fileToRead);
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
        deleteFile(photo.codeUrl);

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

const base64ToImageWithPath = (userId, base64, name, basePath, urlPath) => {
    const extension = base64.split(';')[0].split('/')[1];

    if(!photoExtensions.includes(extension.toUpperCase())) {
        throw {message: 'Not a valid extension'};
    }
   const base64Image = base64.replace(/^data:image\/png;base64,/, '');

   const imageName = `${name.replace(/\\|\s|\//g, '')}_${Date.now()}.${extension}`;
   const path = `${basePath}/${userId}`;
   if(!fs.existsSync(path)) {
    fs.mkdir(path, 
        (error) => {
            if(error) {
                throw {message: error.message};
            }
        });
   }
   const url = `${urlPath}/${userId}/${imageName}`;
   const completePath = `${path}/${imageName}`;
   fs.writeFile(completePath, base64Image, 'base64', 
   (error) => {
    if(error) {
        throw {message: error.stack};
    }
   });

   return url;
}

// should be used in try catch block
const writeInFile = (userId, snippet, textContent) => {
    // replace '/' and '\' by '' to not create new route
    const fileName = `${snippet.replace(/\\|\s|\//g, '')}_${Date.now()}.txt`;
    const path = `${CODE_TEXT_STORAGE_PATH}/${userId}`;
    if(!fs.existsSync(path)) {
        fs.mkdir(path, 
            (error) => {
                throw {message: error.stack};
            });
    }

    const url = `${CODE_TEXT_STORAGE_PATH}/${userId}/${fileName}`;
    const completePath = `${path}/${fileName}`;
    fs.writeFile(completePath, textContent, 
        (error) => {
            if(error) {
                throw {message: error.stack};
            }
        });

        return url;
}

const readFromFile = (codeUrl) => {
    const content = fs.readFileSync(codeUrl, 'utf-8', 
    (error) => {
        if(error) {
            throw {message: error.message};
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
    
}