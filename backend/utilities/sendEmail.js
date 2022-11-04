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
                filename: 'colored-logo+name.png',
                path: `${APP_IMAGE_LOGO_STORAGE_PATH}`,
                cid: 'logo',
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
    <h1 style="padding:10px;background-color:#f1f1f1;color:white;text-decoration: none;">${text}</h1>
    <div style="font-weight:bold;font-size:20px;">
        <p>In case token expired try to click on "forgot password" again.</p>
        <p>Best Regards,&nbsp;</p>
    </div>
    <a style="width=175px;" href="https://linkedin.com/in/moatasem-yakhni-2b62b922b" target="_blank">
        <img style="display:block;" src='cid:logo' width="175px" height="200px" />
    </a>
    `;
}

module.exports = sendEmail;