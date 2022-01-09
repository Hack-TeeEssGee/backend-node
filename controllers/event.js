const {Events, SocEvents} = require("../utils/connection");
const {Op} = require("sequelize");
exports.uploadTSGEvent = async (req, res) => {
    try {
        const {name, fb_post_link, category, start_date, end_date} = req.body;

        await Events.create({
            location: req.file.location,
            fb_post_link,
            name: name,
            category,
            start_date: start_date.substr(0, 10),
            end_date: end_date.substr(0, 10),
        });

        const response = {Status: "Success", Details: "Event Created"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Events.findAll();

        const response = {Status: "Success", Details: "All Current Events", events};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getTodaysEvents = async (req, res) => {
    try {
        const {date} = req.body;
        const events = await Events.findAll({
            where: {
                [Op.and]: [{end_date: {[Op.gte]: date.substr(0, 10)}}, {start_date: {[Op.lte]: date.substr(0, 10)}}],
            },
        });

        const response = {Status: "Success", Details: "All Current Events", events};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getSocietyEvents = async (req, res) => {
    try {
        const {id} = req.params;

        const events = await SocEvents.find({where: {society_id: id}});

        const response = {Status: "Success", Details: "All Events of The Society", events};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
