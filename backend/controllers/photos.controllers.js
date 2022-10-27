require('dotenv').config();
const Photo = require('../models/Photo');
const fs = require('fs');

const {getUserById} = require('./users.controller');

const {
    photoExtensions, // array
    allowedProgrammingLanguages, // array
} = require('../utilities/conditionalVariables');

/**********************/
// .env variables
const CODE_TEXT_STORAGE_PATH = process.env.CODE_TEXT_STORAGE_PATH;

const CODE_IMAGE_STORAGE_PATH = process.env.CODE_IMAGE_STORAGE_PATH;

const CODE_IMAGE_URL = process.env.CODE_IMAGE_URL;
/**********************/


const getPhotosByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        if(!userId) {
            throw {message: 'User id is required'};
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

        if(!allowedProgrammingLanguages.includes(programmingLanguage.toUpperCase())) {
            throw {message: 'Unsupported Programming Language'};
        }

        if(!getUserById(userId)) {
            throw {message: 'User Not Found'};
        }

        const getPhotoUrl = base64ToImageWithPath(userId, base64Photo, snippetName, CODE_IMAGE_STORAGE_PATH, CODE_IMAGE_URL);

        const getCodeUrl = writeInFile(userId, snippetName, codeTextContent);
    } catch (error) {
        
    }
}
// should be used in try catch block

const base64ToImageWithPath = (userId, base64, name, basePath, urlPath) => {
    const extension = base64.split(';')[0].split('/')[1];

    if(!photoExtensions.includes(extension.toUpperCase())) {
        throw {message: 'Not a valid extension'};
    }
   const base64Image = base64.replace(/^data:image\/png;base64,/, "");

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
        throw {message: error.message};
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
                throw {message: error.message};
            });
    }

    const url = `${CODE_TEXT_STORAGE_PATH}/${userId}/${fileName}`;
    const completePath = `${path}/${fileName}`;
    fs.watchFile(completePath, textContent, 
        (error) => {
            if(error) {
                throw {message: error.message};
            }
        });

        return url;
}