const { Router } = require("express");
const passport = require("passport");

const productsRouter = require("./products.router.js");
const usersRouter = require("./users.router.js");
const categoriesRouter = require("./categories.router.js");
const customersRouter = require("./customers.router.js");
const ordersRouter = require("./orders.router");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");

function routerApi(app) {
  // Creando una ruta madre dinamica
  const router = Router();
  app.use("/api/v1", router);

  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
  router.use(
    "/categories",
     passport.authenticate("jwt", { session: false }),
     categoriesRouter
  );
  router.use("/customers", customersRouter);
  router.use("/orders", ordersRouter);
  router.use("/auth", authRouter);
  router.use(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    profileRouter
  );
}

module.exports = routerApi;