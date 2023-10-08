const { Router } = require("express");

const UserService = require("./../services/users.service.js");
const { validatorHandler } = require("./../middlewares/validator.handler.js");
const {
  updateUserSchema,
  createUserSchema,
  getUserSchema
} = require("./../dto/user.dto.js");

const usersRouter = Router();
const service = new UserService();

usersRouter.get('/', async (req, res, next) => {
  try {
    const categories = await service.Find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.FindOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.Create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.Update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.Delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = usersRouter;