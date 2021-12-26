const router = require("express").Router();
const {
  test,
  sendOTP,
  loginStudent,
  loginOffical,
  registerOfficial,
} = require("../controllers/auth");

router.get("/", test);

router.post("/otp", sendOTP);

router.post("/student/login", loginStudent);

router.post("/official/register", registerOfficial);

router.post("/official/login", loginOffical);

module.exports = router;
