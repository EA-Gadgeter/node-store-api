import express from "express";

import ProductsService from "../services/products.service.js";
import { validatorHandler } from "../middlewares/validator.handler.js";

import {
  createProductSchema,
  getProductSchema,
  updateProductSchema
} from "../dto/product.dto.js";

const productsRouter = express.Router();
// Generamos una INSTANCIA del servicio
const service = new ProductsService();

productsRouter.get("/", async (req, res) => {
  const products = await service.Find();
  res.json(products);
});

// Las rutas fijas deben ir antes de que las dinamicas, pues
// pueden dar lugar a errores de routing, en este caso
// si "/filter" no fuera antes, se confundiria con un ":id"
productsRouter.get("/filter", (req, res) => {
  res.send("Yo soy un filtro");
});

productsRouter.get("/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.FindOne(id);

      res.status(200).json(product);
    } catch (error) {
      // Le decimos de manera explicita que ejecute los middlewares tipo error
      next(error);
    }
  }
);

// Aunque no lo parezca la funcion que pasamos que recibe
// el "(req, res)" ES UN MIDDLEWARE por lo que antes
// de esta funcion, podemos mandar otros middlewares,
// que no queremos que se ejecuten en TODA la app

// Recordemos que el "validatorHandler" es un middleware
// dinamico al que le pasamos un schema de Joi a validar
// y la propiedad de donde va a sacar la data a validar
// IMPORTANTE: TENEMOS que ejecutar "validatorHandler()"
// pues este NO ES el middleware en si, SI NO QUE regresa
// un middleware, basicamente hace que el codigo quede asi:

//  productsRouter.post("/",
//    (req, res, next) => {,
//    async (req, res) => {...}

// Esta funcion que se regresa tiene acceso a "createProductSchema" 
// y "body", gracias a que es un CLOSURE

productsRouter.post("/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;

    const newProduct = await service.Create(body);

    res.status(201).json(newProduct);
  }
);

// Funcionaria exactamente igual con put
productsRouter.patch("/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.Update(id, body);

      res.json(product);
    } catch (error) {
      // En el servicio, Update() tira un error si el objeto no se encuentra
      // En este try/catch, opbtenemos ese error y lo mandamos por el middleware

      // Forma de manejar el error sin el middleware
      /*res.status(404).json(
        {
          // Los error que tira JS, internamente tienen
          // una propiedad error
          message: error.message
        }
      );*/

      // Mandamos el error al middleware, que muy problamente termine llendo en boom
      next(error);
    }
  }
);

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const productId = await service.Delete(id);

  res.json(productId);
});

export default productsRouter;