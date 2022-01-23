const {Certificate, OtherCertificate} = require("../utils/connection");

exports.uploadCertificate = async (req, res) => {
    try {
        const {email, position, event_id} = req.body;
        console.log(req.file);
        await Certificate.create({
            key: req.file.key,
            fileName: req.file.originalname,
            position: position,
            event: event_id,
            email,
        });

        res.status(200).send({Status: "Success", Details: "Document uploaded"});
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.uploadIndividualCertificate = async (req, res) => {
    try {
        const {name, email, position} = req.body;
        await OtherCertificate.create({
            key: req.file.key,
            fileName: req.file.originalname,
            position: position,
            email,
            event_name: name,
            event_image:
                "https://kgpverse-events.s3.ap-south-1.amazonaws.com/event/Ecological+press+conference+member+speaking+on+stage.jpg",
        });

        res.status(200).send({Status: "Success", Details: "Document uploaded"});
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
