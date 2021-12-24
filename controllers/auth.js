let Session = require("supertokens-node/recipe/session");
var otpGenerator = require("otp-generator");
const { AddMinutes } = require("../utils/utility");
const { OTP } = require("../utils/connection");
const { encode } = require("../utils/crypt");
const { message, subject_mail } = require("../template/email");
const nodemailer = require("nodemailer");

exports.test = (req, res) => {
  res.send("Authentication zone reached");
};

// @route POST /authenticate/otp
// @desc send OTP to email
exports.sendOTP = async (req, res) => {
  // ref: https://medium.com/geekculture/how-to-make-a-scalable-otp-service-3df8300941ba
  try {
    const { email } = req.body;
    if (!email) {
      res
        .status(400)
        .send({ Status: "Failure", Details: "Email Not provided" });
    }

    const otp = otpGenerator.generate(6, {
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutes(now, 10);

    //Create OTP instance in DB
    const otp_instance = await OTP.create({
      otp,
      expiration_time,
    });
    //Userdetails
    var details = {
      timestamp: now,
      check: email,
      success: true,
      message: "OTP sent to user",
      otp_id: otp_instance.id,
    };

    //Encode user_details
    const encoded = await encode(JSON.stringify(details));

    email_message = message(otp);
    email_subject = subject_mail;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `${process.env.EMAIL_ADDRESS}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: `"KGPverse"<${process.env.EMAIL_ADDRESS}>`,
      to: `${email}`,
      subject: email_subject,
      text: email_message,
    };

    await transporter.verify();

    await transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        return res.status(400).send({ Status: "Failure", Details: err });
      } else {
        return res.send({ Status: "Success", Details: encoded });
      }
    });
  } catch (err) {
    const response = { Status: "Failure", Details: err.message };
    return res.status(400).send(response);
  }

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
