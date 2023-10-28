const { Router } = require("express");

const productsRouter = require("./products.router.js");
const usersRouter = require("./users.router.js");
const categoriesRouter = require("./categories.router.js");
const customersRouter = require("./customers.router.js");

function routerApi(app) {
  // Creando una ruta madre dinamica
  const router = Router();
  app.use("/api/v1", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
  router.use("/customers", customersRouter);
}

module.exports = routerApi;