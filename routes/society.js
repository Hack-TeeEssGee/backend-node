const { getAllSociety } = require("../controllers/society");

const router = require("express").Router();

router.get("/",getAllSociety)

module.exports = router;
