const express = require('express');

const {
    savePhoto,
    getPhotoById,
    getPhotosByUserId,
    editPhotoById,
    deletePhoto,
} = require('../controllers/photos.controller');

const router = express.Router();
router.get('/photo/:photoId', getPhotoById);
router.get('/:userId', getPhotosByUserId);
router.post('/', savePhoto);
router.patch('/photo/:photoId', editPhotoById);
router.delete('/:photoId', deletePhoto);

module.exports = router;