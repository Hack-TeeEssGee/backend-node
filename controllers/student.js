const {Student, Events, Certificate} = require("../utils/connection");
const uuid = require("uuid");
const AWS = require("aws-sdk");
const {getFileFromS3} = require("../utils/middleware/multer");
const {decode} = require("../utils/crypt");

exports.getCertificateList = async (req, res) => {
    try {
        const {email} = req.body;

        const student_instance = await Student.findOne({where: {email}});

        const certificate_list = JSON.parse(student_instance.certificates);

        let event_details = [];
        for (e in certificate_list) {
            const certificate_instance = await Certificate.findOne({where: {id: certificate_list[e]}});
            const event_instance = await Events.findOne({where: {id: certificate_instance.event}});
            event_details.push({
                id: event_instance.id,
                name: event_instance.name,
                category: event_instance.category,
            });
        }

        const response = {Status: "Success", Details: "Students Certificate details fetched", event_details};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getCertificate = async (req, res) => {
    try {
        const {id, email} = req.query;
        const certificate_instance = await Certificate.findOne({where: {id}});
        if (email !== certificate_instance.email) {
            const response = {Status: "Failure", Details: "Session Hijacking"};
            return res.status(400).send(response);
        }

        const key = certificate_instance.key;

        let fileToSend = getFileFromS3(key);
        res.attachment(certificate_instance.fileName);
        fileToSend.pipe(res);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
