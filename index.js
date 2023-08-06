import express from "express"

import routerApi from "./routes/index.js";
import { boomErrorHandler, errorHandler, logErrors } from "./middlewares/error.handler.js";


const app = express();
const port =  process.env.POST ?? 3000;

// Middlewares para poder recibir informacion en formato JSON
app.use(express.json());

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