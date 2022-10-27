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

const emailTemplate = (fullName, text) => {
    return `
    <p style="font-weight:bold;font-size:20px;">Dear ${fullName},</p>
    <p style="font-weight:bold;font-size:20px;">Please copy the following code and paste it in the token box in maximum ${parseInt(TOKEN_EXPIRY_TIME_IN_SECONDS/60)} minutes: </p>
    <h1 style="padding:10px;background-color:#ccc">${text}</h1>
    <div style="font-weight:bold;font-size:20px;">
        <p>In case token expired try to click on "forgot password" again.</p>
        <p>Best Regards&nbsp;</p>
        <p>CodeCamTeam&nbsp;</p>
    </div>
    <a href="https://linkedin.com/in/moatasem-yakhni-2b62b922b" target="_blank">
        <img style="display:block;" src='cid:logo.png' width="50px" height="50px" />
    </a>
    `;
}

module.exports = sendEmail;