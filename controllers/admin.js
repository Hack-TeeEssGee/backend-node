const {Bill} = require("../utils/connection");

exports.updateBill = async (req, res) => {
    try {
        const {id, status,remark} = req.body;

        const bill_instance = await Bill.find({where: {id}});

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
