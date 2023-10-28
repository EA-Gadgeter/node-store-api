const boom =  require("@hapi/boom");

const poolDB = require("../libs/postgresPool.js");
const { sequelize } = require("../libs/sequelize.js");

const { models } = sequelize;

class UsersService {
  constructor() {
    // Cada servicio debe tener internamente el mismo pool
    this.poolDB = poolDB;
    // Imprimimos un mensaje por si la conexion llega a fallar
    this.poolDB.on("error", (error) => {
      console.log(error);
    });
  }

  async Create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async Find() {
    // Primera forma de hacer conexiones a la DB creando un cliente
    // No recomendable
    //const client = await getPGConnection();
    //const response = await client.query("SELECT * FROM tasks");

    // En cada query, el mismo pool se encarga de crear
    // un cliente y cerrar la conexion
    // const query = "SELECT * FROM tasks";
    // const response = await this.poolDB.query(query);

    // Con sequelize
    const data = await models.User.findAll({
      include: ["customer"]
    });
    return data;
  }

  async FindOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("User not found");
    }

    return user;
  }

  async Update(id, changes) {
    const user = await this.FindOne(id);
    const response = await user.update(changes);

    return response;
  }

  async Delete(id) {
    const user = await this.FindOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UsersService;