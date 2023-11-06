const boom = require("@hapi/boom");

const appConfig = require("../config/config")

function checkApiKey(req, res, next) {
    const apiKey = req.headers["api"];

    if (apiKey === appConfig.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

module.exports = { checkApiKey };