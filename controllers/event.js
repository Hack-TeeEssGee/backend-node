const {Events} = require("../utils/connection");

exports.uploadEvent = async (req, res) => {
    try {
        const {name, fb_post_link} = req.body;

        const event_instance = await Events.create({
            location: req.file.location,
            fb_post_link,
            name: name,
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
