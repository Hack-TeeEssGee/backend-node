const router = require("express").Router();
const {updateBill} = require("../controllers/admin");
const {getSolvedGrievence, getPendingGrievence, updateGrievenceStatus} = require("../controllers/grievence");

router.put("/bill", updateBill);
router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);
router.put("/update/grievence", updateGrievenceStatus);

module.exports = router;
