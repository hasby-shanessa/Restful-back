const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const config = require('../../config/config');

const router = express.Router();

const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: ['src/docs/*.yml', 'src/routes/v1/*.route.js'],
});

router.use(
    '/',
    (req, res, next) => {
        if (config.env === 'development') {
            return next();
        } else {
            const auth = { login: 'admin', password: '@agua' };
            const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
            const [login, pwd] = Buffer.from(b64auth, 'base64').toString().split(':');
            if (login && pwd && login === auth.login && pwd === auth.password) {
                return next();
            }
            res.set('WWW-Authenticate', 'Basic realm="401"');
            res.status(401).send('Authentication required.');
        }
    },
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true
    })
);

module.exports = router;