const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
const DATABASE = process.env.DATABASE;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! Shutting Down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./app');
let DB = DATABASE_LOCAL;
if (NODE_ENV === 'production') {
    DB = DATABASE.replace(
        '<PASSWORD>', DATABASE_PASSWORD
    );
};

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('DB connection successful!');
}).catch ((err) => {
    console.log('DB connection failed!');
    console.log(err, err.name, err.message);
});

const port = PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App is running on ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!! Shutting Down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});