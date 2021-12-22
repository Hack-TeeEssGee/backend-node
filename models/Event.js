const Sequelize = require("sequelize");

const { sequelize } = require("../utils/connection");

const Event = sequelize.define(
  "event",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    type: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Event;
