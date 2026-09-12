// TODO: Update some test methods such as invalid email types

const request = require('supertest');
const User = require('./../models/userModel');
const app = require('../app');

describe('AUTH API', () => {
    describe('POST /api/v1/users/signup', () => {
        test('should create a new user', async () => {
            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({
                    name: 'Test User',
                    email: 'test@test.com',
                    password: 'password123',
                    passwordConfirm: 'password123'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.status).toBe('success');
            expect(res.body.token).toBeDefined();
            expect(res.body.data.user.email).toBe('burak@test.com');

            const user = await User.findOne({ email: 'burak@test.com' }).select('+password');

            expect(user).not.toBeNull();
            expect(user.password).not.toBe('password123')
        });

        test('should reject signup without name', async () => {
            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({
                    email: 'test@test.com',
                    password: 'password123',
                    passwordConfirm: 'password123'
                });

            expect(res.statusCode).toBe(400);
        });

        test('Should reject password shorter than 8 characters', async () => {
            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({
                    name: 'Test User',
                    email: 'test@tes.com',
                    password: '1234567',
                    passwordConfirm: '1234567'
                });

            expect(res.statusCode).toBe(400);
        });

        test('Should reject duplicate email', async () => {
            await User.create({
                name: 'Existing user',
                email: 'existing@test.com',
                password: 'password123',
                passwordConfirm: 'password123'
            });

            const res = await request(app)
                .post('/api/v1/users/signup')
                .send({
                    name: 'Another user',
                    email: 'existing@test.com',
                    password: 'password123',
                    passwordConfirm: 'password123'
                });

            expect(res.body.statusCode).toBe(400);
        });
    });

    describe('POST /api/v1/users/login', () => {
        beforeEach(async () => {
            await User.create({
                name: 'LOgin User',
                email: 'login@test.com',
                password: 'password123',
                passwordConfirm: 'password123'
            });
        });

        test('Should login with correct email and password', async () => {
            const res = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'login@test.com',
                    password: 'password123'
                });

            expect(res.body.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.token).toBeDefined();
            expect(res.headers['set-cookie']).toBeDefined();
        });

        test('Should reject wrong password', async () => {
            const res = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'login@test.com',
                    password: 'wrongPassword'
                });

            expect(res.body.statusCode).toBe(401);
        });

        test('Should reject wrong email', async () => {
            const res = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'wrong@test.com',
                    password: 'password123'
                });

            expect(res.body.statusCode).toBe(401);
        });

        test('Should reject missing email', async () => {
            const res = await request(app)
                .post('/api/v1/users/login')
                .send({
                    password: 'password123'
                });

            expect(res.body.statusCode).toBe(400);
        });

        test('Should reject missing password', async () => {
            const res = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'login@test.com'
                });

            expect(res.body.statusCode).toBe(400);
        });
    });

    describe('GET /api/v1/users/logout', () => {
        test('Should logout user', async () => {
            const res = await request
                .get('/api/v1/users/logout');

            expect(res.body.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.headers['set-cookie']).toBeDefined();
        });
    });
});