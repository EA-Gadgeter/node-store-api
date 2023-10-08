const appConfig = require("../config/config");

const USER = encodeURIComponent(appConfig.db.user);
const PASSWORD = encodeURIComponent(appConfig.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;

module.exports = {
    development: {
        url: URI,
        dialect: "postgres"
    },
    
    production: {
        url: URI,
        dialect: "postgres"
    }
};