import boom from "@hapi/boom";

// Middleware para validar datos
function validatorHandler(schema, property) {
  // Esto a final de cuentas es un middleware
  // pero como tiene que recibir cosas diferentes a
  // "(req, res, next)", usamos un closure
  return (req, res, next) => {
    // Usamos property porque la informacion puede venir
    // del body, params o querie
    const data = req[property];
    // Abort early permite enviar todos los errores en una sola peticion
    // para que el cliente sepa todo lo que esta haciendo mal
    const { error } = schema.validate(data, { abortEarly: false });

    // Si hay error, regresamos uno con boom
    // que va ir a lo middlewares de errores
    if (error) {
      next(boom.badRequest(error));
    } else {
      // Si todo esta bien, seguimos con el siguiente middleware
      // que seria ya el codigo de la ruta o otro middleware mas
      next();
    }
  };
}

export { validatorHandler };