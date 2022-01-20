const {getSolvedGrievence, getPendingGrievence} = require("../controllers/grievence");
const {getOfficeBearers} = require("../controllers/tsg");

const router = require("express").Router();

router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);
router.get("/office", getOfficeBearers);

module.exports = router;
