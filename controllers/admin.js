const {Bill} = require("../utils/connection");
const { getFileFromS3 } = require("../utils/middleware/multer");

exports.updateBill = async (req, res) => {
    try {
        const {id, status, remark} = req.body;

        const bill_instance = await Bill.findOne({where: {id}});

        bill_instance.status = status;
        bill_instance.remark = remark;

        await bill_instance.save();

        const response = {Status: "Success", Details: "Bill Updated"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.downloadBill = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            const response = {
                Status: "Failure",
                Details: "Bill Id not provided",
            };
            return res.status(400).send(response);
        }

        const bill_instance = await Bill.findOne({where: {id}});
        const key = bill_instance.key;

        let fileToSend = getFileFromS3(key);
        res.attachment(bill_instance.fileName);
        fileToSend.pipe(res);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
