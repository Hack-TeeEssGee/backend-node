const router = require("express").Router();
const {uploadCertificate} = require("../controllers/certificate");
const {upload_certificate} = require("../utils/middleware/multer");

router.post("/upload", upload_certificate.single("image"), uploadCertificate);

module.exports = router;
