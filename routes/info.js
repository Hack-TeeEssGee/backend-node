const router = require("express").Router();
const {getHallInfo} = require("../controllers/info");

router.get("/hall", getHallInfo);

module.exports = router;
