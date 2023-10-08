import { Model, DataTypes, Sequelize } from "sequelize";

// Una buena practica es definir el nombre de nuestra tabla
const USER_TABLE = "users";

const userSchema = {
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

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW
  }
};

class User extends Model {
  static associate() {

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

export {
  USER_TABLE,
  userSchema,
  User
};