import express from "express";
import { faker } from "@faker-js/faker";

const productsRouter = express.Router();

productsRouter.get("/", (req, res) => {
    const { size } = req.query;
  
    const products = [];
  
    const limit = size ?? 100;
  
    for (let i = 0; i < limit; i++) {
      products.push(
        {
          name: faker.commerce.productName(),
          price: Number(faker.commerce.price()),
          image: faker.image.url()
        }
      );
    }
  
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

res.json(
    { 
    id,
    name: "Product 2",
    price: 1500
    }
)
});

productsRouter.post("/", (req, res) => {
  const body = req.body;

  res.json(
    {
      message: "User created",
      data: body,
    }
  );
});

// Funcionaria exactamente igual con put
productsRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json(
    {
      message: "User changed",
      id,
      data: body,
    }
  );
});

productsRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  res.json(
    {
      message: "Deleted user",
      id,
    }
  );
});

export default productsRouter;