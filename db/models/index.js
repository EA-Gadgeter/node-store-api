const { User, UserSchema } = require("./user.model.js");
const { Customer, CustomerSchema } = require("./customer.model.js");
const { CategorySchema, Category } = require("./category.model");
const { ProductSchema, Product } = require("./product.model");
const { OrderSchema, Order } = require("./order.model");
const { OrderProductSchema, OrderProduct } = require("./order-products.model");

// Aqui vamos a inicializar todos los modelos
function setupModels(sequelize) {
    // Decimos que inicie la configuracion del modelo
    // con cierto schema de datos y configuracion
    // AQUI irian todos los modelos
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

    // Despues de los init, creamos las asocianoes, que son las relaciones entre las tablas
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
}

module.exports = setupModels;