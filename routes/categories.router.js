const { Router }  = require("express");

const CategoryService = require("./../services/categories.service.js");
const { validatorHandler } = require("./../middlewares/validator.handler.js");
const { 
  createCategorySchema, 
  updateCategorySchema, 
  getCategorySchema 
} = require("./../dto/category.dto.js");

const categoriesRouter = Router();
const service = new CategoryService();

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await service.Find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

categoriesRouter.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
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

categoriesRouter.post('/',
  validatorHandler(createCategorySchema, 'body'),
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

categoriesRouter.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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

categoriesRouter.delete('/:id',
  validatorHandler(getCategorySchema, 'params'),
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

module.exports = categoriesRouter;