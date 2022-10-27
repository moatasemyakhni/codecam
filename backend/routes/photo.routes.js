const express = require('express');
const userAuthMiddleware = require('../middlewares/user.middleware');

const {
    savePhoto,
    getPhotoById,
    getPhotosByUserId,
    editPhotoById,
    deletePhoto,
} = require('../controllers/photos.controllers');

const router = express.Router();
router.get('/photo/:photoId', userAuthMiddleware, getPhotoById);
router.get('/:userId', userAuthMiddleware, getPhotosByUserId);
router.post('/', userAuthMiddleware, savePhoto);
router.patch('/photo/:photoId', userAuthMiddleware, editPhotoById);
router.delete('/:photoId', userAuthMiddleware, deletePhoto);

module.exports = router;