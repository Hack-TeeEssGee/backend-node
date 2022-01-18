const {Events, Certificate} = require("../utils/connection");
const {getFileFromS3} = require("../utils/middleware/multer");

exports.getCertificateList = async (req, res) => {
    try {
        const {email} = req.body;

        if (!email) {
            const response = {
                Status: "Failure",
                Details: "Email not provided",
            };
            return res.status(400).send(response);
        }

        const certificate_list = await Certificate.findAll({attributes: ["id"], where: {email}});

        let event_details = [];
        for (e in certificate_list) {
            const certificate_instance = await Certificate.findOne({where: {id: certificate_list[e].id}});
            const event_instance = await Events.findOne({where: {id: certificate_instance.event}});
            event_details.push({
                certificate_id: certificate_list[e].id,
                event_image: event_instance.location,
                position: certificate_instance.position,
                event_id: event_instance.id,
                name: event_instance.name,
                category: event_instance.category,
            });
        }

        const response = {
            Status: "Success",
            Details: "Students Certificate details fetched",
            certificate_list: event_details,
        };
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getCertificate = async (req, res) => {
    try {
        const {id, email} = req.query;
        if (!email) {
            const response = {
                Status: "Failure",
                Details: "Email not provided",
            };
            return res.status(400).send(response);
        }

        if (!id) {
            const response = {
                Status: "Failure",
                Details: "Certificate Id not provided",
            };
            return res.status(400).send(response);
        }

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
