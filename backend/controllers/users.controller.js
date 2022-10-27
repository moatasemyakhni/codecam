require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createJWTToken = (user) => {
    const token = jwt.sign(
        {
            userId: user._id,
            fullName: user.fullName,
            profilePhotoUrl: user.profilePhotoUrl,
        },
        process.env.User_ACCESS_TOKEN,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS,
        }
    );

    return token;
} 
