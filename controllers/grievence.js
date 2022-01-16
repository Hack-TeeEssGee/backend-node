const {Grievence} = require("../utils/connection");
const {Op} = require("sequelize");

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

exports.getSolvedGrievence = async (req, res) => {
    try {
        const grievences = await Grievence.findAll({where: {status: "Solved"}});

        const response = {Status: "Success", Details: "All Solved Grievence Returned", response: grievences};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getPendingGrievence = async (req, res) => {
    try {
        const grievences = await Grievence.findAll({where: {status: "Pending"}});

        const response = {Status: "Success", Details: "All Pending Grievence Returned", response: grievences};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.updateGrievenceStatus = async (req, res) => {
    try {
        const {id, status} = req.body;

        const grievence_instance = await Grievence.findOne({where: {id}});

        grievence_instance.status = status;

        grievence_instance.save();

        const response = {Status: "Success", Details: "Grievence Updated"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
