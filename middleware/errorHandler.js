const apiResponse = require('../helpers/apiResponse');
const { errorLogger } = require('../helpers/logger'); // replace './logger' with the path to your logger.js file

const defaultMessages = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
};

function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    const message = err.message || defaultMessages[statusCode] || 'An error occurred';

    // Use errorLogger to log the error details
    errorLogger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(statusCode).json(apiResponse(statusCode, message, null));
}

module.exports = errorHandler;