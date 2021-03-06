const {Society, Bill} = require("../utils/connection");

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

exports.addSociety = async (req, res) => {
    try {
        const {name, description} = req.body;

        await Society.create({
            name,
            description,
            logo: req.file.location,
        });

        const response = {Status: "Success", Details: "Society Created"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.uploadBill = async (req, res) => {
    try {
        const {name, amount, description, society_id} = req.body;

        await Bill.create({
            key: req.file.key,
            name,
            amount,
            description,
            society_id,
            fileName: req.file.originalname,
        });

        const response = {Status: "Success", Details: "Bill Uploaded"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getBills = async (req, res) => {
    try {
        const {id} = req.params;

        const bills = await Bill.findAll({
            where: {
                society_id: id,
            },
        });

        const response = {Status: "Success", Details: "Bills Loaded", bills};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
