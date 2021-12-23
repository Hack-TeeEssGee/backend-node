let Session = require("supertokens-node/recipe/session");

exports.test = (req, res) => {
  res.send("Authentication zone reached");
};

// @route POST /authenticate/otp
// @desc send OTP to email
exports.sendOTP = (req, res) => {
  const { email } = req.body;
  
  res.send(email);
};

exports.loginStudent = async (req, res) => {
  // verify user's email...
  // verify OTP and expiry.

  let userId = "chiragghosh@kgpian.iitkgp.ac.in"; // get from db
  let role = "student";

  await Session.createNewSession(res, userId, { role });

  /* a new session has been created.
   * - an access & refresh token has been attached to the response's cookie
   * - a new row has been inserted into the database for this new session
   */

  res.json({ message: "Student logged in!" });
};

exports.loginOffical = async (req, res) => {
  // verify user's email password and role assigned...
  // verify OTP and expiry.

  let userId = "chiragghosh@kgpian.iitkgp.ac.in"; // get from db
  let role = "admin";

  await Session.createNewSession(res, userId, { role });

  /* a new session has been created.
   * - an access & refresh token has been attached to the response's cookie
   * - a new row has been inserted into the database for this new session
   */

  res.json({ message: "Official logged in!" });
};
