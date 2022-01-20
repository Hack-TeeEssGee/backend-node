const {sheetID} = require("../utils/constants");
const {Sheet} = require("../utils/sheets");

exports.getHallInfo = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, "Hall");
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All Hall Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
