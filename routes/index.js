const { Router } = require("express");

const productsRouter = require("./products.router.js");
const usersRouter = require("./users.router.js");
const categoriesRouter = require("./categories.router.js");
const customersRouter = require("./customers.router.js");
const ordersRouter = require("./orders.router");
const authRouter = require("./auth.router");

function routerApi(app) {
  // Creando una ruta madre dinamica
  const router = Router();
  app.use("/api/v1", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
  router.use("/customers", customersRouter);
  router.use("/orders", ordersRouter);
  router.use("/auth", authRouter);
}

module.exports = routerApi;