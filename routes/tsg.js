const { getSolvedGrievence, getPendingGrievence } = require("../controllers/grievence");

const router = require("express").Router();

router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);

module.exports = router;
