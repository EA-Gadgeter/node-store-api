'use strict';

const { USER_TABLE, UserSchema } = require("../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(USER_TABLE, UserSchema.recoveryToken.field, {
      field: UserSchema.recoveryToken.field,
      allowNull: UserSchema.recoveryToken.allowNull,
      type: UserSchema.recoveryToken.type
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, UserSchema.recoveryToken.field);
  }
};
