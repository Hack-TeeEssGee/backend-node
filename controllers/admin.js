exports.updateBill = async (req, res) => {
    try {
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
