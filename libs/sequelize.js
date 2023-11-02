const { Sequelize } = require("sequelize");

const appConfig = require("../config/config.js");
const setupModels = require("../db/models/index.js");

// Una tercera forma de manejar nuestra conexion a base
// de datos, que es por un ORM, en el caso de sequelize que
// es el que estamos usando, ya se encarga de generar
// el pool de conexiones

let URI;

const options = {
    dialect: "postgres",
    logging: !appConfig.idProd, // En la consola podemos ver la consulta SQL,
};

if (appConfig.idProd) {
    URI = appConfig.db.url;
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
} else {
    const USER = encodeURIComponent(appConfig.db.user);
    const PASSWORD = encodeURIComponent(appConfig.db.password);
    URI = `postgres://${USER}:${PASSWORD}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;
}

const sequelize = new Sequelize(URI, options);

// Cargamos los modelos en la conexion de sequelize
setupModels(sequelize);

// Las mismos schemas tanto en back como la base
// NO es lo ideal para produccion
// sequelize.sync();

module.exports = {
    sequelize,
    URI
};