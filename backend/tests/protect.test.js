// TODO: Create more protect route test to make sure that every route is protected!

const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { createUser, loginUser } = require('./js/helpers');

describe('PROTECT & AUTHORIZATION', () => {
    describe('Authentication', () => {
        test('Should reject protected route without token', async () => {
            const res = await request(app)
                .get('/api/v1/users/me');

            expect(res.statusCode).toBe(401);
        });

        test('Should allow access with valid JWT cookie', async () => {
            await createUser();

            const loginRes = await loginUser(request);
            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
        });

        test('Should reject invalid JWT', async () => {
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', 'Bearer invalid-token');

            expect(res.statusCode).toBe(401);
        });

        test('Should reject token belonging to deleted user', async () => {
            const user = await createUser();
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            await User.deleteOne({ _id: user._id });
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(401);
        });

        test('Should reject old token after password reset', async () => {
            const user = await createUser();
            const oldToken = jwt.sign(
                {
                    id: user._id,
                    iat: Math.floor(Date.now() / 1000) - 10
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            const resetToken = user.createPasswordResetToken();
            await user.save({ validateBeforeSave: false });
            const resetRes = await request(app)
                .patch(`/api/v1/users/resetPassword/${resetToken}`)
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(resetRes.statusCode).toBe(200);
            expect(resetRes.body.token).toBeDefined();

            const meRes = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${oldToken}`);

            expect(meRes.statusCode).toBe(401);
        });

        test('Should access /me with new token after password reset', async () => {
            const user = await createUser();
            const resetToken = crypto.randomBytes(32).toString('hex');
            user.passwordResetToken = crypto
                .createHash('sha256')
                .update(resetToken)
                .digest('hex');

            user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
            await user.save({ validateBeforeSave: false });
            const resetRes = await request(app)
                .patch(`/api/v1/users/resetPassword/${resetToken}`)
                .send({
                    password: 'newpassword123',
                    passwordConfirm: 'newpassword123'
                });

            expect(resetRes.statusCode).toBe(200);

            const newToken = resetRes.body.token;

            expect(newToken).toBeDefined();

            const meRes = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${newToken}`);

            expect(meRes.statusCode).toBe(200);
            expect(meRes.body.status).toBe('success');
        });
    });

    describe('restrictTo', () => {
        test ('User should not access admin-only user routes', async () => {
            await createUser({
                email: 'user@test.com',
                role: 'user'
            });

            const loginRes = await loginUser(request, 'user@test.com', 'password123');
            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });

        test('Admin should access admin-only user routes', async () => {
            await createUser({
                email: 'admin@test.com',
                role: 'admin'
            });

            const loginRes = await loginUser(
                request,
                'admin@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).not.toBe(403);
        });

        test('Normal user should not access monthly plan', async () => {
            await createUser({
                email: 'normal@example.com',
                role: 'user'
            });

            const loginRes = await loginUser(
                request,
                'normal@example.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/tours/monthly-plan/2021')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });
    });
});