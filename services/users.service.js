import poolDB from "../libs/postgresPool";

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
    return data;
  }

  async Find() {
    // Primera forma de hacer conexiones a la DB creando un cliente
    // No recomendable
    //const client = await getPGConnection();
    //const response = await client.query("SELECT * FROM tasks");

    // En cada query, el mismo pool se encarga de crear
    // un cliente y cerrar la conexion
    const query = "SELECT * FROM tasks";
    const response = await this.poolDB.query(query);

    return response.rows;
  }

  async FindOne(id) {
    return { id };
  }

  async Update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async Delete(id) {
    return { id };
  }
}

export default UsersService;