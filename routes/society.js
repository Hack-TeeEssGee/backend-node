const {getAllSociety, uploadBill, addSociety} = require("../controllers/society");
const {upload_bill, upload_society_logo} = require("../utils/middleware/multer");

const router = require("express").Router();

router.get("/", getAllSociety);
// create a society
router.post("/", upload_society_logo.single("image"), addSociety);


//get all bills


//upload bill
router.post("/bill/upload", upload_bill.single("bill"), uploadBill);

module.exports = router;
