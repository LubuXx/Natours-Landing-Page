jest.mock('nodemailer', () => {
    createTransport: jest.fn(() => ({
        sendMail: jest.fn().mockResolvedValue({
            messageId: 'test-message-id'
        })
    }));
});

const nodemailer = require('nodemailer');
const Email = require('../utils/email');

describe('EMAIL SYSTEM', () => {
    test('should create an SMTP transporter', async () => {
        await Email({
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'Test message'
        });

        expect(nodemailer.createTransport).toHaveBeenCalled();
    });

    test('Should send email with the supplied options', async () => {
        const sendMail = jest.fn().mockResolvedValue({
            messageId: 'test-message-id'
        });

        nodemailer.createTransport.mockReturnValue({
            sendMail
        });

        await Email({
            email: 'recipient@example.com',
            subject: 'Test subject',
            message: 'Hello test'
        });

        expect(sendMail).toHaveBeenCalledWith({
            from: `Burak Bas <${process.env.EMAIL_FROM}>`,
            to: 'recipient@example.com',
            subject: 'Test subject',
            text: 'Hello test'
        });
    });

    test('Should propagate email sending errors', async () => {
        const sendMail = jest.fn().mockRejectedValue(new Error('SMTP Error'));
        nodemailer.createTransport.mockReturnValue({ sendMail });
        await expect(Email({
            email: 'test@example.com',
            subject: 'Test',
            message: 'Test'
        })).rejects.toThrow('SMTP Error');
    });
});