function apiResponse(status, message, data) {
    return {
        status,
        message,
        data,
    };
}

module.exports = apiResponse;
