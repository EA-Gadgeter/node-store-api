const express = require("express");
const cors = require("cors");

const appConfig = require("./config/config.js");
const routerApi = require("./routes/index.js");

const { checkApiKey } = require("./middlewares/auth.handler");
const { 
  boomErrorHandler, 
  errorHandler, 
  logErrors, 
  ormErrorHandler
} = require("./middlewares/error.handler.js");

const app = express();
const port =  appConfig.port;

// Middleware para poder recibir informacion en formato JSON
app.use(express.json());
// Middleware para permitir otros origenes de cors
const whitelist = [
  "http://localhost:8080"
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No allowed"));
    }
  }
};
app.use(cors(options));
require("./utils/auth");

app.get("/", checkApiKey, (req, res) => {
  res.send("Hola, mi server en express");
});

app.get("/nueva-ruta", checkApiKey, (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

routerApi(app);

// Los Middlewares de ERROR se tienen que DEFINIR DESPUES del routing, si no funcionaran
// Es importante la forma en la que se definen los middlewares a usar
// pues como van a ir pasandonse por el next
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});