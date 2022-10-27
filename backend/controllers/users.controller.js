require('dotenv').config();
const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utilities/sendEmail');

const {
    minimumNameLength, 
    maximumNameLength,
    minimumPasswordLength,
    allowedProgrammingLanguages,
} = require('../utilities/conditionalVariables');

const {
    base64ToImageWithPath,
} = require('./photos.controllers');

const {
    hackerEarthConfiguration,
    hackerEarth, 
} = require('../utilities/hackerEarth');

/**********************/
// .env variables
const USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;

const ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS = process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS;

const USER_IMAGE_STORAGE_PATH = process.env.USER_IMAGE_STORAGE_PATH;

const USER_IMAGE_URL = process.env.USER_IMAGE_URL;
/**********************/

// code execution
const codeOutput = async (req, res) => {
    try {
        const {language, source, inputs} = req.body;
        if(!language || !source) {
            // input is optional
            throw {message: 'Language/source are required'};
        }
        if(!allowedProgrammingLanguages.includes(language)) {
            throw {message: 'Unsupported language'};
        }

        hackerEarthConfiguration.lang = language;
        hackerEarthConfiguration.source = source;
        hackerEarthConfiguration.input = inputs;

        const execution = await hackerEarth.execute(hackerEarthConfiguration);

        const hackerEarthId = execution.data.he_id;

        const status = await hackerEarth.get_status(hackerEarthId);

        const outputUrl = status.data.result.run_status.output;
        const codeStatus = status.data.result.run_status.status;
        if(codeStatus !== 'AC') {
            // AC => ACCEPTED
            let errorMessage;
            if(language === 'JAVASCRIPT_NODE') {
                errorMessage = status.data.result.run_status.stderr;
            }else {
                errorMessage = status.data.result.compile_status;
            }
            throw {message: errorMessage};  
        }

        const getOutputConfiguration = {url: outputUrl};

        const output = await hackerEarth.get_output(getOutputConfiguration);

        const displayOutput = {
            output: output.data,
            error: false,
        };

        res.status(200).send(displayOutput);

    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

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
        const user = await User.findOne({_id: decoded.userId}).select({email: 0, createdAt: 0, updatedAt: 0});
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
                token: createJWTToken(user),
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

const editProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const base64Image = req.body.base64Photo;
        if(!base64Image || !userId) {
            throw {message: 'User id and Image are required'};
        }
        const user = await User.findById(userId);
        if(!user) {
            throw {message: 'User Not Found'};
        }
        const newProfile = base64ToImageWithPath(user._id, base64Image, user.fullName, USER_IMAGE_STORAGE_PATH, USER_IMAGE_URL);

        user.profilePhotoUrl = newProfile;
        await user.save();

        res.status(200).send({error: false, message: 'Profile updated successfully'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
    
}

const editFullName = async (req, res) => {
    try {
        const userId = req.params.userId;
        const fullName = req.body.fullName;
        if(!fullName || !userId) {
            throw {message: 'User id and fullName are required'};
        }
        if(fullName.trim().length < minimumNameLength) {
            throw {message: `Name should be at least ${minimumNameLength} chars`};
        }else if(fullName.trim().length > maximumNameLength) {
            throw {message: `Name should be at most ${maximumNameLength} chars`};
        }
        const user = await User.findById(userId);
        if(!user) {
            throw {message: 'User Not Found'};
        }
        user.fullName = fullName;
        await user.save();

        res.status(200).send({error: false, message: 'FullName is updated successfully'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

// Reset password
const sendEmailToUser = async (req, res) => {
    try {
        const email = req.body.email;
        if(!email) {
            throw {message: 'Email is required'};
        }
        const user = await getUserByEmail(email);
        if(!user) {
            throw {message: 'Email does not exists'};
        }
        let token = await Token.findOne({userId: user._id});
        if(!token) {
            token = new Token();
            token.userId = user._id;
            token.token = crypto.randomBytes(64).toString('hex');
            await token.save();
        }
        const input = `${user._id}/${token.token}`;
        await sendEmail(user.fullName, user.email, 'Reset Password', input);
        res.status(201).send({error: false, message: 'Password reset link sent to your email account'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

const changePassword = async (req, res) => {
    try {
        const string = req.body.idPlusToken;
        const newPassword = req.body.password;
        if(!string) {
            throw {message: 'Token is required'};
        }
        const idPlusToken = string.split('/');
        const userId = idPlusToken[0];
        const token = idPlusToken[1];

        const user = await User.findById(userId);
        if(!user) {
            throw {message: 'Invalid token or expired'};
        }
        const getToken = await Token.findOne({userId: userId, token: token});
        if(!getToken) {
            throw {message: 'Invalid token or expired'};
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        // token is a one time usage
        await getToken.delete();
        res.status(200).send({error: false, message: 'Password reset successfully'});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}
module.exports = {
    signup,
    sendEmailToUser,
    changePassword,
    login,
    editProfile,
    editFullName,
    getUserByToken,
    getUserById,
    codeOutput,
};