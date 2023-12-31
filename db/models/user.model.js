const { Model, DataTypes, Sequelize } = require("sequelize");

// Una buena practica es definir el nombre de nuestra tabla
const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  recoveryToken: {
    field: "recovery_token",
    allowNull: true,
    type: DataTypes.STRING
  },

  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "customer"
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: "customer",
      foreignKey: "userId"
    })
  }

  static config(sequelize) {
    return {
      sequelize, // La conexion de squelize
      tableName: USER_TABLE, // Nombre de la tabla
      modelName: "User", // Nombre del modelos, el mismo de la clase
      timestamps: false,
    }
  }
}

module.exports = {
  USER_TABLE,
  UserSchema,
  User
};