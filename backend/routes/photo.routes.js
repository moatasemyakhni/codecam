const express = require('express');
const userAuthMiddleware = require('../middlewares/user.middleware');

const {
    savePhoto,
    getPhotoById,
    getPhotosByUserId,
    editPhotoById,
} = require('../controllers/photos.controllers');

const router = express.Router();
router.get('/photo/:photoId', userAuthMiddleware, getPhotoById);
router.post('/', userAuthMiddleware, savePhoto);
router.get('/:userId', userAuthMiddleware, getPhotosByUserId);
router.patch('/photo/:photoId', userAuthMiddleware, editPhotoById);

module.exports = router;