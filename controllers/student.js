const {Student, Events, Certificate} = require("../utils/connection");
const uuid = require("uuid");

exports.getCertificateList = async (req, res) => {
    try {
        const {email} = req.body;

        const student_instance = await Student.findOne({where: {email}});

        const certificate_list = JSON.parse(student_instance.certificates);

        let event_details = [];
        for (e in certificate_list) {
            const certificate_instance = await Certificate.findOne({where: {id: certificate_list[e]}});
            const event_instance = await Events.findOne({where: {id: certificate_instance.event}});
            event_details.push({name: event_instance.name, link: event_instance.location});
        }

        const response = {Status: "Success", Details: "Students Certificate details fetched", event_details};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
