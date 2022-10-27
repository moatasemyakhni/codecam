require('dotenv').config();
const Photo = require('../models/Photo');
const fs = require('fs');

const {getUserById} = require('./users.controller');

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