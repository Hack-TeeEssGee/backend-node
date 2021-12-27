const router = require("express").Router();
const { uploadCertificate } = require("../controllers/certificate");
const { upload } = require("../utils/middleware/multer");

router.post("/upload",upload.single('image'), uploadCertificate);

module.exports = router;
