function validateRequestStructure(req, res, next) {
    if (typeof req.body !== 'object' || req.body === null || !req.body.hasOwnProperty('data')) {
        return res.badRequest('Bad Request - Invalid request structure (Missing required key: data)');
    }

    const { data } = req.body;

    if (data === undefined || data === null || (typeof data !== 'object' && !Array.isArray(data))) {
        return res.badRequest('Bad Request - Invalid request structure (data must be an object or array)');
    }

    next();
}

module.exports = validateRequestStructure;