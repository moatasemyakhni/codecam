require('dotenv').config();
const User = require('../models/User');
const Token = require('../models/Token');
const crypto = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const vision = require('@google-cloud/vision');
const {Storage} = require('@google-cloud/storage');
const sendEmail = require('../utilities/sendEmail');
const {
    minimumNameLength, 
    maximumNameLength,
    minimumPasswordLength,
    allowedProgrammingLanguages, // array
    photoExtensions, // array
} = require('../utilities/conditionalVariables');


const {
    hackerEarthConfiguration,
    hackerEarth, 
} = require('../utilities/hackerEarth');

/**********************/
// .env variables
const USER_ACCESS_TOKEN = process.env.USER_ACCESS_TOKEN;

const ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS = process.env.ACCESS_TOKEN_EXPIRE_TIME_IN_HOURS;

const USER_IMAGE_STORAGE_PATH = process.env.USER_IMAGE_STORAGE_PATH;

const USER_IMAGE_CLOUD_URL = process.env.USER_IMAGE_CLOUD_URL;

const RESET_PASSWORD_BASE_URL = process.env.RESET_PASSWORD_BASE_URL;

const GOOGLE_FILE_PATH = process.env.GOOGLE_FILE_PATH;

const PROJECT_ID = process.env.PROJECT_ID;

const BUCKET_NAME = process.env.BUCKET_NAME;

const UNSAVED_IMAGES_CLOUD_PATH = process.env.UNSAVED_IMAGES_CLOUD_PATH;

const CODE_IMAGE_STORAGE_PATH = process.env.CODE_IMAGE_STORAGE_PATH;

const GET_USER_IMAGE_CLOUD_URL = process.env.GET_USER_IMAGE_CLOUD_URL;

/**********************/
const client = new vision.ImageAnnotatorClient({
    keyFilename: GOOGLE_FILE_PATH,
    projectId: PROJECT_ID
});

const storage = new Storage({
    keyFilename: GOOGLE_FILE_PATH,
    projectId: PROJECT_ID
   });

const codeCamBucket = storage.bucket(BUCKET_NAME);

//scan photo
const textDetection = async (req, res) => {
    try {
        const {base64Image, fullName} = req.body;
        if(!base64Image || !fullName) {
            throw {message: 'Image and Name is required'};
        }
        
        const url = await base64ToImageWithPath('unsaved', base64Image, fullName, CODE_IMAGE_STORAGE_PATH, UNSAVED_IMAGES_CLOUD_PATH, UNSAVED_IMAGES_CLOUD_PATH);
        const fileName = url.split(`${BUCKET_NAME}/`)[1];
        const [result] = await client.textDetection(`gs://${BUCKET_NAME}/${fileName}`);
        if(!result.fullTextAnnotation) {
            if(!result.error) {
                throw {message: 'Picture is in bad quality/does not include code'};
            }
            throw {message: result.error.message};
        }
        const detection = result.fullTextAnnotation.text;
        res.status(200).send({error: false, detection: detection});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
}

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

// should be used in try catch block
const checkUserAuth = async (token, id) => {
    const decoded = jwt.verify(token.split(' ')[1], USER_ACCESS_TOKEN);
    if(!decoded) {
        throw {message: "User not found"};
    }
    if(decoded.userId == id) return true;

    return false;
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
        const token = req.headers.authorization;
        const userId = req.params.userId;
        const base64Image = req.body.base64Photo;
        const checkAuth = await checkUserAuth(token, userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
        if(!base64Image || !userId) {
            throw {message: 'User id and Image are required'};
        }
        const user = await User.findById(userId);
        if(!user) {
            throw {message: 'User Not Found'};
        }
        const newProfile = await base64ToImageWithPath(user._id, base64Image, user.fullName, USER_IMAGE_STORAGE_PATH, USER_IMAGE_CLOUD_URL, GET_USER_IMAGE_CLOUD_URL);

        user.profilePhotoUrl = newProfile;
        await user.save();

        res.status(200).send({error: false, message: 'Profile updated successfully', profilePhoto: user.profilePhotoUrl});
    } catch (error) {
        res.status(400).send({error: true, message: error.message});
    }
    
}

const editFullName = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const userId = req.params.userId;
        const fullName = req.body.fullName;
        const checkAuth = await checkUserAuth(token, userId);
        if(!checkAuth) {
            throw {message: 'UnAuthorized'};
        }
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

        res.status(200).send({error: false, message: 'FullName is updated successfully', newName: user.fullName});
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
        const input = `${RESET_PASSWORD_BASE_URL}/${user._id}/${token.token}`;
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

// should be used in try catch block

const base64ToImageWithPath = async (userId, base64, name, basePath, urlPath, getUrlPath) => {
    const extension = base64.split(';')[0].split('/')[1];
    if(!photoExtensions.includes(extension.toUpperCase())) {
        throw {message: 'Not a valid extension'};
    }
    
    const find = `data:image/${extension};base64,`;
    const regex = new RegExp(find, "g");
    const base64Image = base64.replace(regex, '');

   const imageName = `${name.replace(/\\|\s|\//g, '')}_${Date.now()}.${extension}`;
   const path = `${basePath}/${userId}`;
   if(!fs.existsSync(path)) {
    fs.mkdir(path, 
        (error) => {
            if(error) {
                throw {message: error.message};
            }
        });
   }

    const completePath = `${path}/${imageName}`;
    fs.writeFile(completePath, base64Image, 'base64', 
    (error) => {
        if(error) {
            throw {message: error.stack};
        }
    });

    const destination = `${urlPath.split(`${BUCKET_NAME}/`)[1]}/${userId}/${imageName}`;

    await codeCamBucket.upload(completePath, {
        destination: destination
    });

    const url = `${getUrlPath}/${userId}/${imageName}`;

    return url;
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
    checkUserAuth,
    textDetection,
    base64ToImageWithPath
};