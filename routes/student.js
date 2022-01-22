const {uploadGrievence} = require("../controllers/grievence");
const {getAllNews} = require("../controllers/news");
const {getCertificateList, getCertificate} = require("../controllers/student");
const {upload_grievence} = require("../utils/middleware/multer");

const router = require("express").Router();

router.post("/dashboard", getCertificateList);
router.get("/", getCertificate);
router.post("/grievence", upload_grievence.single("image"), uploadGrievence);
router.get("/news", getAllNews);

module.exports = router;
