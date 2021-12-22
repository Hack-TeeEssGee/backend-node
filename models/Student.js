const Sequelize = require("sequelize");

const { sequelize } = require("../utils/connection");

const Student = sequelize.define(
  "student",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Student;
