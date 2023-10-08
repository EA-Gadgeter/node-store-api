const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

const { sequelize } = require("../libs/sequelize.js");

// Todo lo de esta clase antes estaba en las rutas de 
// productos, lo seperamos en una CAPA de SERVICIOS aparte,
// esto basandonos en la CLEAN ARCHITECTURE
class ProductsService {
  constructor() {
    this.products = [];
    this.Generate();
    /*this.poolDB = poolDB;
    this.poolDB.on("error", (error) => {
      console.log(error);
    });*/
  }

  Generate() {
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push(
        {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: Number(faker.commerce.price()),
          image: faker.image.url(),
          isBlock: faker.datatype.boolean()
        }
      );
    }
  }

  async Create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async Find() {
    const query = "SELECT * FROM tasks";
    // Usando el pool de conexiones
    //const response = await this.poolDB.query(query);
    //return response.rows;


    // Usando sequelize
    const [data] = await sequelize.query(query);
    return data;
  }

  async FindOne(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      // Boom tiene funciones para los diferentes statuscode
      throw boom.notFound("Product not found");
    }

    if (product.isBlock) {
      throw boom.conflict("Product is blocked");
    }

    return product;
  }

  async Update(id, changes) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw boom.notFound("Product not found");
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...changes
    };

    return this.products[productIndex];
  }

  async Delete(id) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw boom.notFound("Product not found");
    }

    this.products.splice(productIndex, 1);
    return { id };
  }
}

module.exports = ProductsService;