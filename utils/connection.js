const {Sequelize} = require("sequelize");

const Logger = require("../utils/logger");

//Models Imports
const {Event_Model} = require("../models/Event");
const {OTP_Model} = require("../models/OTP");
const {Official_Model} = require("../models/Official");
const {Certificate_Model} = require("../models/Certificate");
const {Other_Certificate_Model} = require("../models/OtherCertficate");
const {Society_Model} = require("../models/Society");
const {Bill_Model} = require("../models/Bill");
const {SocEvent_Model} = require("../models/societyEvent");
const {Grievence_Model} = require("../models/Grievence");
const {OfficialImages_Model} = require("../models/OfficialImages");
const {Blog_Model} = require("../models/Blog");
const {News_Model} = require("../models/News");

const sequelize = new Sequelize(process.env.DATABASE_STRING, {
    logging: false,
});


const Events = Event_Model(sequelize, Sequelize);
const SocEvents = SocEvent_Model(sequelize, Sequelize);
const OTP = OTP_Model(sequelize, Sequelize);
const Official = Official_Model(sequelize, Sequelize);
const Certificate = Certificate_Model(sequelize, Sequelize);
const OtherCertificate = Other_Certificate_Model(sequelize, Sequelize);
const Society = Society_Model(sequelize, Sequelize);
const Bill = Bill_Model(sequelize, Sequelize);
const Grievence = Grievence_Model(sequelize, Sequelize);
const OfficialImage = OfficialImages_Model(sequelize, Sequelize);
const Blog = Blog_Model(sequelize, Sequelize);
const News = News_Model(sequelize, Sequelize);

sequelize.sync({alter: true}).then(() => {
    Logger.info("db and tables have been created");
});

module.exports = {
    Events,
    OTP,
    Official,
    Certificate,
    OtherCertificate,
    Society,
    Bill,
    SocEvents,
    Grievence,
    OfficialImage,
    Blog,
    News,
};
