const { User, userSchema } = require("./user.model.js");

// Aqui vamos a inicializar todos los modelos
function setupModels(sequelize) {
    // Decimos que inicie la configuracion del modelo
    // con cierto schema de datos y configuracion
    // AQUI irian todos los modelos
    User.init(userSchema, User.config(sequelize));
}

module.exports = setupModels;