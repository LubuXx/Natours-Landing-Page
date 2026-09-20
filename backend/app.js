const express = require('express');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRoutes = require('./routes/tourRouter');
const userRoutes = require('./routes/userRouter');
const reviewRoutes = require('./routes/reviewRouter');

const app = express();
const limiter = rateLimit(
    {
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: 'Too many requests from this IP. Please try again in an hour!'
    }
);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(cors(
    {
        origin: process.env.FRONTEND_HOST_LOCAL,
        credentials: true
    }
));

app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp(
    {
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    }
));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;