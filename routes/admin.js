const router = require("express").Router();
const {updateBill, downloadBill} = require("../controllers/admin");
const {getSolvedGrievence, getPendingGrievence, updateGrievenceStatus} = require("../controllers/grievence");
const {getAllNews} = require("../controllers/news");

router.put("/bill", updateBill);
router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);
router.put("/grievence", updateGrievenceStatus);
router.get("/bill/:id", downloadBill);
router.get("/news", getAllNews);

module.exports = router;
