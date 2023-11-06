const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const { sequelize } = require("../libs/sequelize");

const { models } = sequelize;

class CustomerService {
  constructor() {
  }

  async Find() {
    return await models.Customer.findAll({
      include: ["user"]
    });
  }

  async FindOne(id) {
    const user = await models.Customer.findByPk(id);

    if (!user) {
      throw boom.notFound("Customer not found");
    }

    return user;
  }

  async Create(data) {
    const hashedPassword = await bcrypt.hash(data.user.password, 10);
    
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hashedPassword
      }
    }

    const newCustomer = await models.Customer.create(newData, {
      include: ["user"]
    });

    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async Update(id, changes) {
    const model = await this.FindOne(id);
    return await model.update(changes);
  }

  async Delete(id) {
    const model = await this.FindOne(id);
    await model.destroy();
    return { response: true };
  }
}

module.exports = CustomerService;