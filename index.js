import express from "express"
import cors from "cors";

import routerApi from "./routes/index.js";
import { 
  boomErrorHandler, 
  errorHandler, 
  logErrors 
} from "./middlewares/error.handler.js";

const app = express();
const port =  process.env.POST ?? 3000;

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

app.get("/", (req, res) => {
  res.send("Hola, mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

routerApi(app);

// Los Middlewares de ERROR se tienen que DEFINIR DESPUES del routing, si no funcionaran
// Es importante la forma en la que se definen los middlewares a usar
// pues como van a ir pasandonse por el next
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});