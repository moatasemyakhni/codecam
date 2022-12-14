const express = require('express');
const path = require('path');
const {
    signup,
    sendEmailToUser,
    login,
    changePassword,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', signup);
router.post('/login', login);
router.post('/send-password', sendEmailToUser);
router.post('/change-password', changePassword);

router.get('/reset-password/:id/:token', (_, res) => {
    return res.sendFile(path.join(__dirname, '../views/reset-password/index.html'));
});

router.get('/views/reset-password/logo', (_, res) => {
    return res.sendFile(path.join(__dirname, '../views/reset-password/logo.png'));
});

router.get('/views/reset-password/style', (_, res) => {
    return res.sendFile(path.join(__dirname, '../views/reset-password/style.css'));
});

router.get('/views/reset-password/resetPassword', (_, res) => {
    return res.sendFile(path.join(__dirname, '../views/reset-password/resetPassword.js'));
});

module.exports = router;