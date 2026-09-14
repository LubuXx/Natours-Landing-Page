// TODO: Update some tests for make more safe and efficient tests (passsword passwordconfirm matchs etc.)

jest.mock('../utils/email', () => jest.fn().mockResolvedValue(true));

const request = require('supertest');
const crypto = require('crypto');
const app = require('../app');
const User = require('../models/userModel');
const Email = require('../utils/email');
const { createUser, loginUser } = require('./js/helpers');

describe('PASSWORD API', () => {
    describe('PATCH /api/v1/users/forgotPassword', () => {
        test('Should create a reset token for an existing user', async () => {
            await createUser({
                email: 'forgot@test.com'
            });

            const res = await request(app)
                .patch('/api/v1/users/forgotPassword')
                .send({
                    email: 'forgot@test.com'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(Email).toHaveBeenCalled();

            const user = await User.findOne({
                email: 'forgot@test.com'
            }).select('+passwordResetToken +passwordResetExpires');

            expect(user.passwordResetToken).toBeDefined();
            expect(user.passwordResetExpires).toBeDefined();
        });

        test('Should reject a non-existing email', async () => {
            const res = await request(app)
                .patch('/api/v1/users/forgotPassword')
                .send({
                    email: 'doesnotexist@test.com'
                });

            expect(res.statusCode).toBe(404);
        });
    });

    describe('PATCH /api/v1/users/resetPassword/:token', () => {
        test('Should reset a password with a valid token', async () => {
            const user = await createUser({
                email: 'reset@test.com'
            });

            const resetToken = user.createPasswordResetToken();
            await user.save({ validateBeforeSave: false });
            const res = await request(app)
                .patch(`/api/v1/users/resetPassword/${resetToken}`)
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.token).toBeDefined();

            const updatedUser = await User.findOne({
                email: 'reset@test.com'
            }).select('+password');

            expect(await updatedUser.correctPassword('newpassword123', updatedUser.password)).toBe(true);
        });

        test('Should reject an invalid reset token', async () => {
            const res = await request(app)
                .patch('/api/v1/users/resetPassword/invalid-token')
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(400);
        });

        test('Should reject mismatched reset password', async () => {
            const user = await createUser({
                email: 'mismatch@test.com'
            });

            const resetToken = user.createPasswordResetToken();
            await user.save({ validateBeforeSave: false });
            const res = await request(app)
                .patch(`/api/v1/users/resetPassword/${resetToken}`)
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
        });

        test('Should reject an expired reset token', async () => {
            const user = await createUser({
                email: 'expired@test.com'
            });

            user.passwordResetToken = crypto
                .createHash('sha256')
                .update('expired-token')
                .digest('hex');

            user.passwordResetExpires = Date.now() - 1000;
            await user.save({ validateBeforeSave: false });
            const res = await request(app)
                .patch('/api/v1/users/resetPassword/expired-token')
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('PATCH /api/v1/users/updateMyPassword', () => {
        test('Should update a password with the correct current password', async () => {
            await createUser({
                email: 'updatepassword@test.com'
            });

            const loginRes = await loginUser(
                request,
                'updatepassword@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .patch('/api/v1/users/updateMyPassword')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    passwordCurrent: 'password123',
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.token).toBeDefined();
        });

        test('Should reject an incorrect current password', async () => {
            await createUser({
                email: 'wrongcurrent@test.com'
            });

            const loginRes = await loginUser(
                request,
                'wrongcurrent@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .patch('/api/v1/users/updateMyPassword')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    passwordCurrent: 'wrongpassword',
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(401);
        });

        test('Should reject mismatched new passwords', async () => {
            await createUser({
                email: 'mismatchupdate@test.com'
            });

            const loginRes = await loginUser(
                request,
                'mismatchupdate@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .patch('/api/v1/users/updateMyPassword')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    passwordCurrent: 'password123',
                    password: 'password123',
                    passwordConfirm: 'wrongpassword'
                });

            expect(res.statusCode).toBe(400);
        });

        test('Should reject unauthenticated password update', async () => {
            const res = await request(app)
                .patch('/api/v1/users/updateMyPassword')
                .send({
                    passwordCurrent: 'password123',
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(res.statusCode).toBe(401);
        });
    });
});