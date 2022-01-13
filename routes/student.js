
const {getCertificateList, getCertificate} = require("../controllers/student");

const router = require("express").Router();

router.post("/dashboard", getCertificateList);
router.get("/", getCertificate);

module.exports = router;
