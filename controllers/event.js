const {Event} = require("../utils/connection");

exports.uploadEvent = async (req, res) => {
    try {
        const {name,fb_post_link} = req.body;

        const event_instance = await Event.create({
            location: req.file.location,
            fb_post_link,
            name: name,
        });

        res.send("Event Created");
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
