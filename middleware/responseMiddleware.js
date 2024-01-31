const apiResponse = require('../helpers/apiResponse');

function responseMiddleware(req, res, next) {
    // Successful responses
    res.success = (data) => res.status(200).json(apiResponse(200, 'Success', data));
    res.created = (data) => res.status(201).json(apiResponse(201, 'Resource created successfully', data));
    res.noContent = (message) => res.status(204).json(apiResponse(204, message, null));

    // Client errors
    res.badRequest = (message) => res.status(400).json(apiResponse(400, message, null));
    res.unauthorized = (message) => res.status(401).json(apiResponse(401, message, null));
    res.forbidden = (message) => res.status(403).json(apiResponse(403, message, null));
    res.notFound = (message) => res.status(404).json(apiResponse(404, message, null));
    res.notAllowed = (message) => res.status(405).json(apiResponse(405, message, null));
    res.conflict = (message) => res.status(409).json(apiResponse(409, message, null));

    // Server errors
    res.internalServerError = (message) => res.status(500).json(apiResponse(500, message, null));
    res.notImplemented = (message) => res.status(501).json(apiResponse(501, message, null));
    res.badGateway = (message) => res.status(502).json(apiResponse(502, message, null));
    res.serviceUnavailable = (message) => res.status(503).json(apiResponse(503, message, null));
    res.gatewayTimeout = (message) => res.status(504).json(apiResponse(504, message, null));

    next();
}

module.exports = responseMiddleware;
