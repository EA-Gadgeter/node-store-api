const pg = require("pg");
const appConfig = require("../config/config.js");

// Podemos crear un CONNECTION STRING en lugar de
// ir pasando dato por dato a la conexion, ciframos
// el usuario y contrasenia, pues es la info mas sensible
// de igual manera toda la info de la conexion viene
// de VARIABLES DE ENTORNO
const USER = encodeURIComponent(appConfig.db.user);
const PASSWORD = encodeURIComponent(appConfig.db.password);
const URI = `postgres://${USER}:${PASSWORD}@${appConfig.db.host}:${appConfig.db.port}/${appConfig.db.name}`;

// En lugar de crear un cliente cada vez que nos queremos
// conectar, usamos un "pool" que se va a encargar de
// manejar esas conexiones, optimizandolas

// Otra de forma de resolver este problema, seria usando un
// singleton con injeccion de dependencias, con un unico \
// cliente conectado a la base
const poolDB = new pg.Pool(
  {
    connectionString: URI
  }
);
;

module.exports = poolDB;

