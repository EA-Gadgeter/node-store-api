const { Router } = require("express")

const CustomersService = require("../services/customers.service");
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema
} = require("../dto/customer.dto");

const customersRouter = Router();
const service = new CustomersService();

customersRouter.get("/", async (req, res, next) => {
  try {
    res.json(await service.Find());
  } catch (error) {
    next(error)
  }
});

customersRouter.post("/",
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.Create(body));
    } catch (error) {
      next(error);
    }
  }
);

customersRouter.patch("/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.Update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

customersRouter.delete("/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(201).json(await service.Delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = customersRouter;
