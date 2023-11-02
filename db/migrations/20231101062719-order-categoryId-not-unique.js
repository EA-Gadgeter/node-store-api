'use strict';

const { PRODUCT_TABLE } = require("../models/product.model");
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_TABLE, "category_id", {
      unique: false,
      type: DataTypes.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(PRODUCT_TABLE, "category_id", {
      unique: true,
      type: DataTypes.INTEGER
    })
  }
};
