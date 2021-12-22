const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_STRING);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const closeDB = () => {
  const sequelize = new Sequelize(process.env.DATABASE_STRING);
  sequelize.close();
};

exports.sequelize = sequelize;
exports.connectDB = connectDB;
exports.closeDB = closeDB;
