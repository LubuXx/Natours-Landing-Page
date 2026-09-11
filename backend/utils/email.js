// TODO: Create development email system (Mailtrap)
const nodemailer = require('nodemailer');

const Email = async options => {
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

module.exports = Email;




// TODO: After basic auth design, create production (SendGrip) email system.