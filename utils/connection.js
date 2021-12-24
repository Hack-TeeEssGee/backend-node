const { Sequelize } = require("sequelize");

const Logger = require("../utils/logger");

//Models Imports
// const Student = require("./models/Student");
const { Event_Model } = require("../models/Event");

const sequelize = new Sequelize(process.env.DATABASE_STRING, {
  logging: false,
});

const Event = Event_Model(sequelize, Sequelize);

sequelize.sync().then(() => {
  Logger.info("db and tables have been created");
});

module.exports = { Event };
