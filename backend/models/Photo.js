const mongoose = require('mongoose');

const {allowedProgrammingLanguages} = require('../utilities/conditionalVariables');

const photoSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        required: 'Photo Url is required',
    },
    codeUrl: {
        type: String,
        required: 'Code Url is required',
    },
    programmingLanguage: {
        type: String,
        enum: allowedProgrammingLanguages,
        required: 'Choosing a programming language is required',
    },
    snippetName: {
        type: String,
        default: 'Snippet Title',
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'User id is required',
        ref: 'user',
    },
});

photoSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Photo = mongoose.model('photo', photoSchema);

module.exports = Photo;