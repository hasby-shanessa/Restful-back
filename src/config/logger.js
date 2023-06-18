const winston = require('winston');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.message, stack: info.stack });
    }

    return info;
});


const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info', // default level is debug
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        })
    ]
});

module.exports = logger;