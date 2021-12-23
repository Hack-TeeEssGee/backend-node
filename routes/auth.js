const router = require("express").Router();
let Session = require("supertokens-node/recipe/session");
const {
  test,
  sendOTP,
  loginStudent,
  loginOffical,
} = require("../controllers/auth");

router.get("/", test);

router.post("/otp", sendOTP);

router.post("/student-login", loginStudent);

router.post("/official-login", loginOffical);

module.exports = router;
