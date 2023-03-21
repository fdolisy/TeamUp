const nodemailer = require('nodemailer');

// Sends an email with a created message to a specific user
//
// @param {String} to The email to send the message to
// @param {String} message The content of the email
// @return {promise}
function sendEmail(to, message) {
    return new Promise((resolve, reject) => {
        // transporter to send mail
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // specified mail options
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: "<No Reply> Confirmation of Capstone Project Selections",
            text: message
        };

        // send the mail using the specified mail options and transporter
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error);
            } else {
                console.log(info.response);
                resolve();
            }
        });
    });
}
module.exports = sendEmail;
