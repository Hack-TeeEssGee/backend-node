const {Sequelize} = require("sequelize");

const Logger = require("../utils/logger");

//Models Imports
// const Student = require("./models/Student");
const {Event_Model} = require("../models/Event");
const {OTP_Model} = require("../models/OTP");
const {Official_Model} = require("../models/Official");
const {Student_Model} = require("../models/Student");
const {Certificate_Model} = require("../models/Certificate");

const sequelize = new Sequelize(process.env.DATABASE_STRING, {
    logging: false,
});

const Events = Event_Model(sequelize, Sequelize);
const OTP = OTP_Model(sequelize, Sequelize);
const Official = Official_Model(sequelize, Sequelize);
const Student = Student_Model(sequelize, Sequelize);
const Certificate = Certificate_Model(sequelize, Sequelize);

sequelize.sync().then(() => {
    Logger.info("db and tables have been created");
});

module.exports = {Events, OTP, Official, Student, Certificate};
