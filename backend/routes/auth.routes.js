const express = require('express');
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

module.exports = router;