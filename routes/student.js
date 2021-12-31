const {getCertificateList} = require("../controllers/student");

const router = require("express").Router();

router.post("/dashboard", getCertificateList);

module.exports = router;
