import express from "express";
import { faker } from "@faker-js/faker";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hola, mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

app.get("/products", (req, res) => {
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
app.get("/products/filter", (req, res) => {
  res.send("Yo soy un filtro");
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  res.json(
    { 
      id,
      name: "Product 2",
      price: 1500
    }
  )
});

app.get("/users", (req, res) => {
  const { limit, offset } = req.query;
  
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send("No hay parametros");
  }
});

app.get("/categories/:categoryId/products/:productId", (req, res) => {
  const { categoryId, productId } = req.params;
  
  res.json(
    {
      categoryId,
      productId
    }
  );
});

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});