const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 20, 
    skipSuccessfulRequests: true, 
    standardHeaders: true, 
    legacyHeaders: false, 
});

module.exports = {
    rateLimiter,
};
