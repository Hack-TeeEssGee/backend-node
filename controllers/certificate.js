const {Certificate, Student} = require("../utils/connection");

exports.uploadCertificate = async (req, res) => {
    try {
        const {email, position, event_id} = req.body;
        console.log(req.file);
        const certificate_instance = await Certificate.create({
            key: req.file.key,
            fileName: req.file.originalname,
            position: position,
            event: event_id,
            email,
        });

        const student_instance = await Student.findOne({where: {email}});

        // USING TEMP WALTHROUGH UNTIL THIS ISSUE GETS FIXED https://github.com/sequelize/sequelize/issues/13833
        // student_instance.certificates.push(certificate_instance.id);
        // await student_instance.save();

        const certificate_list = JSON.parse(student_instance.certificates);
        certificate_list.push(certificate_instance.id);
        student_instance.certificates = JSON.stringify(certificate_list);
        await student_instance.save();

        res.status(200).send({Status: "Success", Details: "Document uploaded"});
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
