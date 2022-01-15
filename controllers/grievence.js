const {Grievence} = require("../utils/connection");

exports.uploadGrievence = async (req, res) => {
    try {
        const {id, name, description, type, resolutions} = req.body;

        await Grievence.create({name, student_id: id, description, type, resolutions, key: req.file.key});

        res.status(200).send({Status: "Success", Details: "Grievence recorded"});
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
