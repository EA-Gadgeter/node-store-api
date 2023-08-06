import pg from "pg";

// "pg" es un modulo que nos permite crear una conexion a una
// base de datos postgres, basicamente creamos un cliente y esperamos
// a que se conecte

// El problema es que usamos getPGConnection en nuestros servicios que son los que traen la info
// generamos una nueva conexion, que se encarga de negociar credenciales, etc, perdiendo entre 20-30ms
// ademas de que claramente a gran escala, nuestra base de datos se puede saturar, ademas de instanciar
// muchos clientes, que son conexiones

// Checar "postgresPool.js" para ver una solucion
async function getPGConnection() {
  const client = new pg.Client(
    {
      host: "localhost",
      port: 5432,
      user: "gadgeter",
      password: "password",
      database: "my_store"
    }
  );

  await client.connect();
  
  return client;
}

export default getPGConnection;

