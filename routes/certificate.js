const router = require("express").Router();
const {uploadCertificate, uploadIndividualCertificate} = require("../controllers/certificate");
const {upload_certificate} = require("../utils/middleware/multer");

router.post("/upload", upload_certificate.single("image"), uploadCertificate);
router.post("/other", upload_certificate.single("image"), uploadIndividualCertificate);

module.exports = router;
