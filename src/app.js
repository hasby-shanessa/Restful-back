const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const httpStatus = require('http-status');
const passport = require('passport');


const config = require('./config/config');
const morgan = require('./config/morgan');
const ApiError = require('./utils/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');
const routes = require('./routes/v1');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { jwtStrategy } = require('./config/passport');

const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to all endpoints
if (config.env === 'production') {
    app.use('/', rateLimiter);
}


app.get('/', (req, res) => {
    res.send('Welcome to the APIs');
});

// v1 api routes
app.use('/api/v1', routes);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError('Not found', httpStatus.NOT_FOUND));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;