'use strict';

const { CustomerSchema, CUSTOMER_TABLE } = require("../models/customer.model");
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, "user_id", {
      field: "user_id",
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {

  }
};
