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
