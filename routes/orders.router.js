const { Router } = require("express");
const { validatorHandler } = require("../middlewares/validator.handler");
const { createOrderSchema, getOrderSchema , addItemSchema} = require("../dto/order.dto");
const OrderService = require("../services/orders.service");

const ordersRouter = Router();
const service = new OrderService();

ordersRouter.get("/",
  async (req, res , next) => {
    try {
      const orders = await service.Find();
      res.status(200).json(orders);
    } catch (error) {
      // Le decimos de manera explicita que ejecute los middlewares tipo error
      next(error);
    }
  }
);

ordersRouter.get("/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req, res , next) => {
    try {
      const { id } = req.params;

      const order = await service.FindOne(id);

      res.status(200).json(order);
    } catch (error) {
      // Le decimos de manera explicita que ejecute los middlewares tipo error
      next(error);
    }
  }
);

ordersRouter.post("/",
  validatorHandler(createOrderSchema, "body"),
  async (req, res) => {
    const body = req.body;

    const newOrder = await service.Create(body);

    res.status(201).json(newOrder);
  }
);

ordersRouter.post("/add-item",
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      console.log(body)
      const newItem = await service.AddItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = ordersRouter;