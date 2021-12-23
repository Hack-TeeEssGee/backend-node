const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const Logger = require("../utils/logger");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_STRING, {
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    Logger.info("Connection has been established successfully.");
  } catch (error) {
    Logger.error("Unable to connect to the database:", error);
  }
};

const closeDB = () => {
  const sequelize = new Sequelize(process.env.DATABASE_STRING);
  sequelize.close();
};

exports.sequelize = sequelize;
exports.connectDB = connectDB;
exports.closeDB = closeDB;
