require('dotenv').config();
const Photo = require('../models/Photo');
const fs = require('fs');

const {getUserById} = require('./users.controller');