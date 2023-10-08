import { Sequelize } from "sequelize";

import appConfig from "../config/config.js";
import setupModels from "../db/models/index.js";

// Una tercera forma de manejar nuestra conexion a base
// de datos, que es por un ORM, en el caso de sequelize que
// es el que estamos usando, ya se encarga de generar
// el pool de conexiones
const USER = encodeURIComponent(appConfig.db.user);
const PASSWORD = encodeURIComponent(appConfig.db.password);
export const URI = `mysql://${USER}:${PASSWORD}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;

const sequelize = new Sequelize(URI, {
    dialect: "mysql",
    logging: true // En la consola podemos ver la consulta SQL
});

// Cargamos los modelos en la conexion de sequelize
setupModels(sequelize);

// Una migracion, en este caso, migro el schema del modelo de 
// "users" a la base de datos
sequelize.sync();

export default sequelize;