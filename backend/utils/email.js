const nodemailer = require('nodemailer');

// Mail for dev and test:
const sendEmail = async options => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: `Burak Bas <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

// Mail for real production:
module.exports = class Email {
    constructor(user, url) {
        this.to = user.email,
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Burak Bas <${process.env.EMAIL_FROM}>`;
    };

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    };

    async send (template, subject) {
        
    };

    async sendWelcome () {

    };

    async sendPasswordreset () {

    };
};

module.exports = sendEmail;