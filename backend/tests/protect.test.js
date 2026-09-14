// TODO: Create more protect route test to make sure that every route is protected!

const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
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

        test('Should reject token after password change', async () => {
            const user = await createUser();
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                }
            );

            user.password = 'newpassword123';
            user.passwordConfirm = 'newpassword123';
            await user.save();

            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(401);
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