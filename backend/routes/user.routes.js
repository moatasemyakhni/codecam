const express = require('express');
const userAuthMiddleware = require('../middlewares/user.middleware');

const {
    signup,
    sendEmailToUser,
    login,
    changePassword,
    editProfile,
    editFullName,
    codeOutput,
    getUserByToken,
} = require('../controllers/users.controller');

const router = express.Router();