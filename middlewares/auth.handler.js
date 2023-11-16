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

function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            next(boom.unauthorized(`Role ${user.role} is not authorized for this`));
        }
    };
}

module.exports = { checkApiKey, checkRoles };