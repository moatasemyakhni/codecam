require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {
    minimumNameLength,
    minimumNameLength, 
    maximumNameLength,
    minimumPasswordLength,
} = require('../utilities/conditionalVariables');

/**********************/
// .env variables
USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;

ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS = process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS;

USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;
/**********************/


// Personal Information
const createJWTToken = (user) => {
    const token = jwt.sign(
        {
            userId: user._id,
            fullName: user.fullName,
            profilePhotoUrl: user.profilePhotoUrl,
        },
        USER_ACCESS_TOKEN,
        {
            expiresIn: ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS,
        }
    );

    return token;
} 

const getUserByToken = async (req, res) => {
    const token = req.headers.authorization;

    try {
        const decoded = jwt.verify(token.split(' ')[1], USER_ACCESS_TOKEN);
        const user = await User.findOne({email: decoded.email}).select({email: 0, createdAt: 0, updatedAt: 0});
        if(!user) {
            throw {message: "User not found"};
        }

        res.status(200).send({error: false, user: user});
    } catch (error) {
        res.status(404).send({error: true, message: error.message});
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return false;
        }
        return user;
    } catch (error) {
        return false;
    }
}

const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        if(!user) {
            return false;
        }
        return user;
    } catch (error) {
        return false;
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            throw {message: 'Email and Password are required'};
        }
        const user = await User.findOne({email}).select('+password');
        if(!user) {
            throw {message: 'Wrong Email or Password'};
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            throw {message: 'Wrong Email or Password'};
        }
        res.status(200).send({error: false, token: createJWTToken(user)});
    } catch (error) {
        res.status(404).send({error: true, message: error.message});
    }
}

const signup = async (req, res) => {
    const {fullName, email, password} = req.body;
    try {
        if(fullName.trim().length < minimumNameLength) {
            throw {message: `Name should be at least ${minimumNameLength} chars`};
        }else if(fullName.trim().length > maximumNameLength) {
            throw {message: `Name should be at most ${maximumNameLength} chars`};
        }
        if(password.length < minimumNameLength) {
            throw {message: `Password should be at least ${minimumPasswordLength} chars`};
        }
        
        const user = await getUserByEmail(email);
        if(!user) {
            const user = new User();
            user.fullName = fullName;
            user.email = email;
            user.password = await bcrypt.hash(password, 10);
            await user.save();

            const freshUser = {
                user: user,
                token: token,
                error: false,
            };

            res.status(201).send(freshUser);
            return;
        }
        throw {message: `${email} is taken`};
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}