const {OfficialImage} = require("../utils/connection");
const {sheetID} = require("../utils/constants");
const {Sheet} = require("../utils/sheets");

exports.getOfficeBearers = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, "TSG Officials");
        const data = await sheet.findOfficialsData();

        res.status(200).send(data);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.updateImage = async (req, res) => {
    try {
        console.log(req);
        await OfficialImage.create({email: req.body.email, location: req.file.location});
        const response = {Status: "Success", Details: "Image Updated"};
        res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
