import express from "express";

import ProductsService from "../services/products.service.js";

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

productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await service.FindOne(id);

  res.status(200).json(product);
});

productsRouter.post("/", async (req, res) => {
  const body = req.body;

  const newProduct = await service.Create(body);

  res.status(201).json(newProduct);
});

// Funcionaria exactamente igual con put
productsRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.Update(id, body);

    res.json(product);
  } catch (error) {
    // En el servicio, Update() tira un error si el objeto no se encuentra
    // En este try/catch, opbtenemos ese error
    res.status(404).json(
      {
        // Los error que tira JS, internamente tienen
        // una propiedad error
        message: error.message
      }
    );
  }
});

productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const productId = await service.Delete(id);

  res.json(productId);
});

export default productsRouter;