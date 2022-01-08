const {Society} = require("../utils/connection");

exports.getAllSociety = async (req, res) => {
    try {
        const societies = await Society.findAll();

        const response = {Status: "Success", Details: "All Socities Loaded", societies};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
