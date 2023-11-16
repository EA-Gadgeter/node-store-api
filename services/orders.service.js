const { sequelize: { models } } = require("./../libs/sequelize");

class OrdersService {

  constructor(){
  }
  async Create(data) {
    return await models.Order.create(data);
  }

  async AddItem(data) {
    return await models.OrderProduct.create(data);
  }

  async FindByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        "$customer.user.id$": userId
      },
      include: [
        {
          association: "customer",
          include: ["user"]
        },
      ]
    });

    return orders;
  }

  async Find() {
    return await models.Order.findAll();
  }

  async FindOne(id) {
    return await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: [ "user" ]
        },
        "items"
      ]
    });
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

module.exports = OrdersService;