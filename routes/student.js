const {uploadGrievence} = require("../controllers/grievence");
const {getCertificateList, getCertificate} = require("../controllers/student");
const {upload_grievence} = require("../utils/middleware/multer");

const router = require("express").Router();

router.post("/dashboard", getCertificateList);
router.get("/", getCertificate);
router.post("/grievence", upload_grievence.single("image"), uploadGrievence);

module.exports = router;
