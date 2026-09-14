const User = require('./../../models/userModel');
const app = require('../../app');

exports.createUser = async (options = {}) => {
    const user = await User.create({
        name: options.name || 'Test User',
        email: options.email || 'test@example.com',
        password: options.password || 'password123',
        passwordConfirm: options.passwordConfirm || options.password || 'password123',
        role: options.role || 'user'
    });

    return user;
};

exports.loginUser = async (request, email = 'test@example.com', password = 'password123') => {
    const response = await request(app)
        .post('/api/v1/users/login')
        .send({ email, password });

    return response;
};

exports.getAuthCookie = async request => {
    const response = await exports.loginUser(request);
    return response.headers['set-cookie'];
};

exports.getToken = async request => {
    const response = await exports.loginUser(request);
    return response.body.token;
};