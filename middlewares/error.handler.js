// MIDDLEWARES PARA ERRORES
const { ValidationError } =  require("sequelize");

// Middle que solo imprime el error en consola
function logErrors(error, req, res, next) {
  console.log("logErrors");
  console.error(error);
  next(error);
}

// Middleware que responde con un status dinamico y un mensaje
// esto se logra con la libreria "boom", revisar los servicios
// pues en ellos se asigna el mensaje y el status con "boom"
function boomErrorHandler(error, req, res, next) {
  // Si no es un error de boom
  // lo pasamos al siguiente middleware
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else next(error);
}

// Ultimo middleware que simplemente responde al cliente con error 500
// el mensaje de error,
function errorHandler(error, req, res, next) {
  res.status(500).json(
    {
      message: error.message,
      stack: error.stack
    }
  );
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    console.log(err);
    const { parent, errors } = err;
    res.status(409).json({
      statusCode: 409,
      error: parent.detail,
      message: errors[0].message
    });
  } else {
    next(err);
  }
}

module.exports = { 
  logErrors, 
  errorHandler, 
  boomErrorHandler, 
  ormErrorHandler 
};