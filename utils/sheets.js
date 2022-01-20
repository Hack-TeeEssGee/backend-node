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
    constructor(sheetId) {
        this.sheetId = sheetId;
    }
    async findDetailsByEmail(email) {
        const gsapi = google.sheets({version: "v4", auth: cl});
        const opt = {
            spreadsheetId: this.sheetId,
            range: "2021",
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
}

exports.Sheet = Sheet;
