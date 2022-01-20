const {google} = require("googleapis");

const keys = require("../gsheets.json");

const cl = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
]);

// async function gsrun(cl) {
//     //cl for client
//     const gsapi = google.sheets({version: "v4", auth: cl});
//     const opt = {
//         spreadsheetId: ,
//         range: "2021",
//     };
//     let dataObtained = await gsapi.spreadsheets.values.get(opt);
//     console.log(dataObtained.data.values);
// }

// gsrun(sheet);

class Sheet {
    constructor(sheetId, sheetName) {
        this.sheetId = sheetId;
        this.sheetName = sheetName;
    }
    async findDetailsByEmail(email) {
        const gsapi = google.sheets({version: "v4", auth: cl});
        const opt = {
            spreadsheetId: this.sheetId,
            range: this.sheetName,
        };
        let dataObtained = await gsapi.spreadsheets.values.get(opt);
        const rows = dataObtained.data.values;
        for (let row of rows) {
            if (row[2] === email) {
                console.log(row);
                let response = {};
                for (const heading in rows[0]) {
                    response[rows[0][heading]] = row[heading];
                }
                return response;
            }
        }
        throw new Error("No such user found");
    }
    async findOfficialsData() {
        const gsapi = google.sheets({version: "v4", auth: cl});
        const opt = {
            spreadsheetId: this.sheetId,
            range: "TSG Officials",
        };
        let dataObtained = await gsapi.spreadsheets.values.get(opt);
        const rows = dataObtained.data.values;

        let data = {"Current Office Bearers": [], "TSG Staff": [], Secretary: []};
        try {
            for (let row_no = 1; row_no < rows.length; row_no++) {
                let row = rows[row_no];
                let obj = {};
                for (let i = 1; i < row.length; i++) {
                    obj[rows[0][i]] = row[i];
                }
                console.log(obj);
                data[row[0]].push(obj);
            }
            return data;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

exports.Sheet = Sheet;
