import { Router } from "express";

import productsRouter from "./products.router.js";
import usersRouter from "./users.router.js";
import categoriesRouter from "./categories.router.js";

function routerApi(app) {
  // Creando una ruta madre dinamica
  const router = Router();
  app.use("/api/v1", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
}

export default routerApi;