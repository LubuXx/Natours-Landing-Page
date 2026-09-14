// TODO: Need to be added more detailed route test and also remove some duplicated test modules in this or other test files

const request = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const { createUser, loginUser } = require('./js/helpers');

describe('USERS API', () => {
    describe('GET /api/v1/users/me', () => {
        test('Should return current logged-in user', async () => {
            await createUser({
                email: 'me@test.com'
            });

            const loginRes = await loginUser(
                request,
                'me@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.data.data.email).toBe('me@test.com')
        });

        test('Should reject unauthenticated request', async () => {
            const res = await request(app)
                .get('/api/v1/users/me');

            expect(res.statusCode).toBe(401);
        });
    });

    describe('PATCH /api/v1/users/updateMe', () => {
        test('Should update current user name', async () => {
            await createUser({
                email: 'update@test.com'
            });

            const loginRes = await loginUser(
                request,
                'update@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .patch('/api/v1/users/updateMe')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Updated Name'
                });

            expect(res.statusCode).toBe(200);

            const updatedUser = await User.findOne({
                email: 'update@test.com'
            });

            expect(updatedUser.name).toBe('Updated Name');
        });

        test('Should reject unaunthenticated update', async () => {
            const res = await request(app)
                .patch('/api/v1/users/updateMe')
                .send({
                    name: 'Updated Name'
                });

            expect(res.statusCode).toBe(401);
        });
    });

    describe('DELETE /api/v1/users/deleteMe', () => {
        test('Should deactivate current user', async () => {
            await createUser({
                email: 'delete@test.com'
            });

            const loginRes = await loginUser(
                request,
                'delete@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .delete('/api/v1/users/deleteMe')
                .set('Authorization', `Bearer ${token}`)
            
            expect(res.statusCode).toBe(204);

            const user = await User.findOne({
                email: 'delete@test.com'
            }).select('+active');

            expect(user).not.toBeNull();
            expect(user.active).toBe(false);
        });
    });

    describe('ÂDMIN USER ROUTES', () => {
        let adminToken;
        beforeEach(async () => {
            await createUser({
                name: 'Admin User',
                email: 'admin@test.com',
                role: 'admin'
            });

            const loginRes = await loginUser(
                request,
                'admin@test.com',
                'password123'
            );

            adminToken = loginRes.body.token;
        });

        test('GET /api/v1/users should return all users for admin', async () => {
            const res = await request(app)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
        });

        test('POST /api/v1/users should not create user for admin', async () => {
            const res = await request(app)
                .post('/api/v1/users')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Create User',
                    email: 'create@test.com',
                    password: 'password123',
                    passwordConfirm: 'password123'
                });

            expect(res.statusCode).toBe(500);
        });

        test('GET /api/v1/users/:id should return user', async () => {
            const user = await createUser({
                email: 'find@test.com'
            });

            const res = await request(app)
                .get(`/api/v1/users/${user._id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(200);
        });

        test('PATCH /api/v1/users/:id should update user', async () => {
            const user = await createUser({
                email: 'patch@test.com'
            });

            const res = await request(app)
                .patch(`/api/v1/users/${user._id}`)
                .set('authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Patched User'
                });

            expect(res.statusCode).toBe(200);
        });

        test('DELETE /api/v1/users/:id should delete user', async () => {
            const user = await createUser({
                email: 'delete@test.com'
            });

            const res = await request(app)
                .delete(`/api/v1/users/${user._id}`)
                .set('Authorization', `Bearer ${adminToken}`);

            expect(res.statusCode).toBe(204);
        });
    });

    describe('USER ROLE RESTRICTION', () => {
        test('Normal user should not acces GET /users', async () => {
            await createUser({
                email: 'normal@test.com',
                role: 'user'
            });

            const loginRes = await loginUser(
                request,
                'normal@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toBe(403);
        });

        test('Normal users should not create another user', async () => {
            await createUser({
                email: 'normal@test.com',
                role: 'user'
            });

            const loginRes = await loginUser(
                request,
                'normal@test.com',
                'password123'
            );

            const token = loginRes.body.token;
            const res = await request(app)  
                .post('/api/v1/users')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Another user',
                    email: 'another@test.com',
                    password: 'password123',
                    passwordConfirm: 'password123'
                });

            expect(res.statusCode).toBe(500);
        });
    });
});