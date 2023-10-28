const boom = require("@hapi/boom");
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
    const newCustomer = await models.Customer.create(data, {
      include: ["user"]
    });

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