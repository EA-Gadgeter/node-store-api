const dotenv = require("dotenv");

// Libreria que nos permite cargar todas las
// VARIABLES DE ENTORNO del archivo .env
dotenv.config();

// Archivo de configuracion con
// todas las VARIABLE DE ENTORNO
// necesarias para la app
const appConfig = {
  env: process.env.NODE_ENV ?? "dev",
  port: process.env.PORT ?? 3000,
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  }
};

module.exports = appConfig;