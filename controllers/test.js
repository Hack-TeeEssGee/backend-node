const {sheetID} = require("../utils/constants");
const {Sheet} = require("../utils/sheets");

exports.testDB = async (req, res) => {
    const sheet = new Sheet(sheetID.student_sheet, "2021");
    const student_instance = await sheet.findDetailsByEmail("rajivharlalka009@gmail.com");

    res.send(student_instance).status(200);
};
