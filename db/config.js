const appConfig = require("../config/config");

let URI = "";

if (appConfig.idProd) {
    URI = appConfig.db.url
} else {
    const USER = encodeURIComponent(appConfig.db.user);
    const PASSWORD = encodeURIComponent(appConfig.db.password);
    URI = `postgres://${USER}:${PASSWORD}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;
}

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