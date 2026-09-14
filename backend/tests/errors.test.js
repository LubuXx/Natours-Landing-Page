// TODO: Detailed tests after complete all backend system (Example: CastError, DuplicateFields, ValidationError etc...)

const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');

describe('ERROR HANDLING', () => {
    test('Should return 400 for duplicate email', async () => {
        await User.create({
            name: 'Existing User',
            email: 'duplicate@test.com',
            password: 'password123',
            passwordConfirm: 'password123'
        });

        const res = await request(app)
            .post('/api/v1/users/signup')
            .send({
                name: 'Another User',
                email: 'duplicate@test.com',
                password: 'password123',
                passwordConfirm: 'password123'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe('fail');
    });

    test('Should return 400 for invalid MongoDB ObjectId', async () => {
        await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'password123',
            passwordConfirm: 'password123',
            role: 'admin'
        });

        const loginRes = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'admin@test.com',
                password: 'password123'
            });

        const token = loginRes.body.token;
        const res = await request(app)
            .get('/api/v1/users/not-valid-user-id')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(400);
    });

    test('Should return 401 for unauthorized protected route', async () => {
        const res = await request(app)
            .get('/api/v1/users/me');

        expect(res.statusCode).toBe(401);
    });

    test('Should return 403 for unauthorized role', async () => {
        await User.create({
            name: 'Normal User',
            email: 'normal@test.com',
            password: 'password123',
            passwordConfirm: 'password123',
            role: 'user'
        });

        const loginRes = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'normal@test.com',
                password: 'password123'
            });

        const token = loginRes.body.token;
        const res = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(403);
    });

    test('SHould return 404 for non-existing-user', async () => {
        const fakeId = '507f1f77bcf86cd799439011';
        await User.create({
            name: 'Admin',
            email: 'admin@test.com',
            password: 'password123',
            passwordConfirm: 'password123',
            role: 'admin'
        });

        const loginRes = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'admin@test.com',
                password: 'password123'
            });

        const token = loginRes.body.token;
        const res = await request(app)
            .get(`/api/v1/users/${fakeId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
    });
});