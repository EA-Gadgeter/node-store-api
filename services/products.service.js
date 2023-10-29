const { sequelize: { models } } = require("./../libs/sequelize");

// Todo lo de esta clase antes estaba en las rutas de 
// productos, lo seperamos en una CAPA de SERVICIOS aparte,
// esto basandonos en la CLEAN ARCHITECTURE
class ProductsService {
  constructor() {
    //this.products = [];
    //this.Generate();
    /*this.poolDB = poolDB;
    this.poolDB.on("error", (error) => {
      console.log(error);
    });*/
  }

  async Create(data) {
   return await models.Product.create(data);
  }

  async Find() {
    // const query = "SELECT * FROM tasks";
    // Usando el pool de conexiones
    //const response = await this.poolDB.query(query);
    //return response.rows;


    // Usando sequelize
    //const [data] = await sequelize.query(query);
    // return data;

    // Usando ORM sequelize
    return await models.Product.findAll({
      include: ["category"]
    });
  }

  async FindOne(id) {
    return await models.Product.findByPk(id, {
      include: ["category"]
    });
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