const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../config.env' });

const NODE_ENV = process.env.NODE_ENV;
const DATABASE = process.env.DATABASE;
const DATABASE_LOCAL = process.env.DATABASE_LOCAL;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

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
}).catch((err) => {
    console.log('DB connection failed!');
    console.log(err, err.name, err.message);
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('DB loaded successfully!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    };
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('DB deleted successfully!');
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    };
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();