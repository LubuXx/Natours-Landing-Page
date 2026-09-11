const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test-secret-key-for-jest';
    process.env.JWT_EXPIRES_IN = '1h';
    process.env.JWT_COOKIE_EXPIRES_IN = '1';

    process.env.EMAIL_HOST = 'sandbox.smtp.mailtrap.io';
    process.env.EMAIL_PORT = '2525';
    process.env.EMAIL_USERNAME = 'test';
    process.env.EMAIL_PASSWORD = 'test';
    process.env.EMAIL_FROM = 'test@example.com';

    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    };

    jest.clearAllMocks();
});

afterAll(async () => {    
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
});