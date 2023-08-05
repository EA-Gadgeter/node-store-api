import express from "express"

import routerApi from "./routes/index.js";

const app = express();
const port =  process.env.POST ?? 3000;

// Middleware para poder recibir informacion en formato JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola, mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

routerApi(app);

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});