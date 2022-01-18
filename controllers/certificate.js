const {Certificate} = require("../utils/connection");

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
