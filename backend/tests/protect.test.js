const request = require('supertest');
const app = require('./../app');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { createUser, loginUser } = require('./js/helpers');

describe('PROTECT & AUTHORIZATION', () => {
    describe('Authentication', () => {
        test('Should reject protected route without token', async () => {
            const res = await request(app)
                .get('/api/v1/users/me');

            expect(res.body.statusCode).toBe(401);
        });

        test('Should allow access with valid JWT cookie', async () => {
            await createUser();

            const loginRes = await loginUser(request);
            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.body.statusCode).toBe(200);
        });

        test('Should reject invalid JWT', async () => {
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', 'Bearer invalid-token');

            expect(res.body.statusCode).toBe(401);
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
                .set('Authorization' `Bearer ${token}`);

            expect(res.body.statusCode).toBe(401);
        });

        test('Should reject token after password change', async () => {
            const user = await createUser();
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            user.password = 'newpassword123',
            user.passwordConfirm = 'newpassword123',
            await user.save();

            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.body.statusCode).toBe(401);
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

            expect(res.body.statusCode).toBe(403);
        });
    });
});