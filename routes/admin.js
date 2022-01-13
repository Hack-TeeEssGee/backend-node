const router = require("express").Router();
const {updateBill} = require("../controllers/admin");

router.put("/bill",updateBill)

module.exports = router;
