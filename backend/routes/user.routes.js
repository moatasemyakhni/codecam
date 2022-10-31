const express = require('express');
const userAuthMiddleware = require('../middlewares/user.middleware');
const {
    editProfile,
    editFullName,
    codeOutput,
    getUserByToken,
} = require('../controllers/users.controller');

const router = express.Router();


router.get('/', userAuthMiddleware, getUserByToken);
router.post('/run', userAuthMiddleware, codeOutput);
router.patch('/edit/photo/:userId', userAuthMiddleware, editProfile);
router.patch('/edit/name/:userId', userAuthMiddleware, editFullName);

module.exports = router;