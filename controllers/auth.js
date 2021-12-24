let Session = require("supertokens-node/recipe/session");
var otpGenerator = require("otp-generator");
const { AddMinutes, dates } = require("../utils/utility");
const { OTP } = require("../utils/connection");
const { encode, decode } = require("../utils/crypt");
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
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
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
};


//@route /authenticate/student/login
//@desc  Validates OTP
exports.loginStudent = async (req, res) => {

  try {
    var currentdate = new Date();
    const { verification_key, otp, check } = req.body;

    if (!verification_key) {
      const response = {
        Status: "Failure",
        Details: "Verification Key not provided",
      };
      return res.status(400).send(response);
    }
    if (!otp) {
      const response = { Status: "Failure", Details: "OTP not Provided" };
      return res.status(400).send(response);
    }
    if (!check) {
      const response = { Status: "Failure", Details: "Check not Provided" };
      return res.status(400).send(response);
    }

    let decoded;

    //Check if verification key is altered or not and store it in variable decoded after decryption
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return res.status(400).send(response);
    }

    var obj = JSON.parse(decoded);
    const check_obj = obj.check;

    // Check if the OTP was meant for the same email or phone number for which it is being verified
    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this particular email or phone number",
      };
      return res.status(400).send(response);
    }

    const otp_instance = await OTP.findOne({ where: { id: obj.otp_id } });

    //Check if OTP is available in the DB
    if (otp_instance != null) {
      //Check if OTP is already used or not
      if (otp_instance.verified != true) {
        //Check if OTP is expired or not
        if (dates.compare(otp_instance.expiration_time, currentdate) == 1) {
          //Check if OTP is equal to the OTP in the DB
          if (otp === otp_instance.otp) {
            // Mark OTP as verified or used
            otp_instance.verified = true;
            otp_instance.save();

            const response = {
              Status: "Success",
              Details: "OTP Matched",
              Check: check,
            };

            let userId = check; // get from db
            let role = "student";

            /* a new session has been created.
             * - an access & refresh token has been attached to the response's cookie
             * - a new row has been inserted into the database for this new session
             */
            await Session.createNewSession(res, userId, { role });

            return res.status(200).send(response);
          } else {
            const response = { Status: "Failure", Details: "OTP NOT Matched" };
            return res.status(400).send(response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP Expired" };
          return res.status(400).send(response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Already Used" };
        return res.status(400).send(response);
      }
    } else {
      const response = { Status: "Failure", Details: "Bad Request" };
      return res.status(400).send(response);
    }
  } catch (err) {
    const response = { Status: "Failure", Details: err.message };
    return res.status(400).send(response);
  }
  // let userId = "chiragghosh@kgpian.iitkgp.ac.in"; // get from db
  // let role = "student";

  // await Session.createNewSession(res, userId, { role });

  // /* a new session has been created.
  //  * - an access & refresh token has been attached to the response's cookie
  //  * - a new row has been inserted into the database for this new session
  //  */

  // res.json({ message: "Student logged in!" });
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