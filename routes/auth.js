const router = require("express").Router();
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
