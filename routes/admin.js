const router = require("express").Router();
const {updateBill, downloadBill} = require("../controllers/admin");
const {getSolvedGrievence, getPendingGrievence, updateGrievenceStatus} = require("../controllers/grievence");
const {getAllNews, uploadNews} = require("../controllers/news");
const {upload_news_image} = require("../utils/middleware/multer");

router.put("/bill", updateBill);
router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);
router.put("/grievence", updateGrievenceStatus);
router.get("/bill/:id", downloadBill);
router.get("/news", getAllNews);
router.post("/news", upload_news_image.single("image"), uploadNews);

module.exports = router;
