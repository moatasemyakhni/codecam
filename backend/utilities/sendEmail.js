const nodemailer = require('nodemailer');

/**********************/
// .env variables
const HOST = process.env.HOST;
const SERVICE = process.env.SERVICE;
const USER = process.env.USER;
const PASSWORD = process.env.PASS;
const APP_IMAGE_LOGO_STORAGE_PATH = process.env.APP_IMAGE_LOGO_STORAGE_PATH;
const TOKEN_EXPIRY_TIME_IN_SECONDS = process.env.TOKEN_EXPIRY_TIME_IN_SECONDS;
/**********************/