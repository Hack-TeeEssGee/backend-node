const {getAllSociety, uploadBill, addSociety} = require("../controllers/society");
const {upload_bill, upload_society_logo} = require("../utils/middleware/multer");

const router = require("express").Router();

router.get("/", getAllSociety);
// create a society
router.post("/", upload_society_logo.single("image"), addSociety);
//upload a event
//get event of partcular society
//upload bill
//get all bills
router.post("/uploadbill", upload_bill.single("bill"), uploadBill);

module.exports = router;
