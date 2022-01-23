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

exports.getGCEvents = async (req, res) => {
    try {
        const sports_sheet = new Sheet(sheetID.student_sheet, "Sports");
        const sports_data = await sports_sheet.find();

        const socult_sheet = new Sheet(sheetID.student_sheet, "Socult");
        const socult_data = await socult_sheet.find();
        const response = {Status: "Success", Details: "All GC events Loaded", data: {sports_data, socult_data}};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getInterIITEvents = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, "InterIIT");
        const data = await sheet.findInterIITData();
        const response = {Status: "Success", Details: "All GC events Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getProfData = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, "Professor");
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All Professor Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getCDCData = async (req, res) => {
    try {
        const {week_no} = req.query;
        const sheet = new Sheet(sheetID.student_sheet, `CDC Week-${week_no}`);
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All CDC Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getCareerPoint = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, `Career Point`);
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All Career Point Data Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getCareerPoint = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, `Career Point`);
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All Career Point Data Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.getAcademicPoint = async (req, res) => {
    try {
        const sheet = new Sheet(sheetID.student_sheet, `Academic Point`);
        const data = await sheet.find();
        const response = {Status: "Success", Details: "All Academic Point Data Loaded", data};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
