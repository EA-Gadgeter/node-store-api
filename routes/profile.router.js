const { Router }  = require("express");

const OrdersService = require("./../services/orders.service.js");
const { validatorHandler } = require("./../middlewares/validator.handler.js");
const { checkRoles } = require("./../middlewares/auth.handler.js");
const ROLES = require("../utils/auth/roles");
const { 
  createCategorySchema, 
  updateCategorySchema, 
  getCategorySchema 
} = require("./../dto/category.dto.js");

const profileRouter = Router();
const service = new OrdersService();

profileRouter.get('/my-orders', async (req, res, next) => {
  try {
    const user = req.user;
    const orders = await service.FindByUser(user.sub);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

module.exports = profileRouter;