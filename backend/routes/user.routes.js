const express = require('express');
const {
    editProfile,
    editFullName,
    codeOutput,
    getUserByToken,
    textDetection
} = require('../controllers/users.controller');

const router = express.Router();


router.get('/', getUserByToken);
router.post('/run', codeOutput);
router.post('/scan', textDetection);
router.patch('/edit/photo/:userId', editProfile);
router.patch('/edit/name/:userId', editFullName);

module.exports = router;