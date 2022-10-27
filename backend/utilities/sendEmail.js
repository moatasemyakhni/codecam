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

const sendEmail = async (fullName, email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: HOST,
            service: SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: USER,
                pass: PASSWORD,
            },
        });

        await transporter.sendMail({
            from: 'CodeCam Team',
            to: email,
            subject: subject,
            html: emailTemplate(fullName, text),
            attachments: [{
                filename: 'logo.png',
                path: `${APP_IMAGE_LOGO_STORAGE_PATH}`,
                cid: 'logo.png',
            }],
        });
        console.log('Email is sent successfully');
    } catch (error) {
        console.log('error:', error.message);
    }
}