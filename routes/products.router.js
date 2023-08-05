import express from "express";

import ProductsService from "../services/products.service.js";

const productsRouter = express.Router();
// Generamos una INSTANCIA del servicio
const service = new ProductsService();

productsRouter.get("/", (req, res) => {
  const products = service.Find();
  res.json(products);
});

// Las rutas fijas deben ir antes de que las dinamicas, pues
// pueden dar lugar a errores de routing, en este caso
// si "/filter" no fuera antes, se confundiria con un ":id"
productsRouter.get("/filter", (req, res) => {
  res.send("Yo soy un filtro");
});

productsRouter.get("/:id", (req, res) => {
  const { id } = req.params;

 const product = service.FindOne(id);

 res.status(200).json(product);
});

productsRouter.post("/", (req, res) => {
  const body = req.body;

  const newProduct = service.Create(body);

  res.status(201).json(newProduct);
});

// Funcionaria exactamente igual con put
productsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const product = service.Update(id, body);

  res.json(product);
});

productsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  const productId = service.Delete(id);

  res.json(productId);
});

export default productsRouter;