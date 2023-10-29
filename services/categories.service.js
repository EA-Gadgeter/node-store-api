const { sequelize: { models } } = require("./../libs/sequelize");

class CategoriesService {

  constructor() {
  }

  async Create(data) {
    return await models.Category.create(data);
  }

  async Find() {
    return await models.Category.findAll();
  }

  async FindOne(id) {
    return models.Category.findByPk(id,  {
      include: ["products"]
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

module.exports = CategoriesService;