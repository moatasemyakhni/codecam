const mongoose = require('mongoose');

const DEFAULT_IMAGE_URL = process.env.DEFAULT_IMAGE_URL;

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Name is required',
        min: 3,
        max: 25,
        trim: true,
    },
    email: {
        type: String,
        required: 'Email is required with right format',
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: 'Password is required',
        select: false,
        min: 6,
    },
    profilePhotoUrl: {
        type: String,
        default: DEFAULT_IMAGE_URL,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
});


const User = mongoose.model('user', userSchema);
module.exports = User;