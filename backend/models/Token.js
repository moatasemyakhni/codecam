// forgot password token
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User id is required',
        ref: 'user',
    },
    token: {
        type: String,
        required: 'Token is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, //in seconds
    }
});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;