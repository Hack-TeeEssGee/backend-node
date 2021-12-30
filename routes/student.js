const {getCertificateList} = require("../controllers/student");

const router = require("express").Router();

router.get("/dashboard", getCertificateList);

module.exports = router;
