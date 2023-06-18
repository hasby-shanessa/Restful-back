const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        PORT: Joi.number().default(3000),

        MONGODB_URL: Joi.string().required().description('Mongo DB url'),

        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),


    }).unknown();


const { error, value: envVars } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);


if (error)
    throw new Error(`Config validation error: ${error.message}`);


module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,  // port to run the app on  default 3000
    url: envVars.URL,

    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },

    twilio: {
        accountSid: envVars.ACCOUNT_SID,
        authToken: envVars.AUTH_TOKEN,
        verifySid: envVars.VERIFY_SID,
    },
};

