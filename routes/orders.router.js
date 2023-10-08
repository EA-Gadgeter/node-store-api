const { Router } = require("express");

const ordersRouter = Router();

ordersRouter.get('/', (req, res) => {
  res.json([]);
});

module.exports = ordersRouter;