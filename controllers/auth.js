let Session = require("supertokens-node/recipe/session");
var otpGenerator = require("otp-generator");
const {AddMinutes, dates, isPresent} = require("../utils/utility");
const {OTP, Official} = require("../utils/connection");
const {encode, decode} = require("../utils/crypt");
const {message, subject_mail} = require("../template/email");
const nodemailer = require("nodemailer");
const {sheetID} = require("../utils/constants");
const {Sheet} = require("../utils/sheets");

exports.test = (req, res) => {
    res.send("Authentication zone reached");
};

// @route POST /authenticate/otp
// @desc send OTP to email
exports.sendOTP = async (req, res) => {
    // ref: https://medium.com/geekculture/how-to-make-a-scalable-otp-service-3df8300941ba
    try {
        const {email} = req.body;
        if (!email) {
            res.status(400).send({Status: "Failure", Details: "Email Not provided"});
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
                return res.status(400).send({Status: "Failure", Details: err});
            } else {
                return res.send({Status: "Success", Details: encoded});
            }
        });
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

//@route /authenticate/student/login
//@desc  Validates OTP
exports.loginStudent = async (req, res) => {
    try {
        var currentdate = new Date();
        const {verification_key, otp, check} = req.body;

        if (!verification_key) {
            const response = {
                Status: "Failure",
                Details: "Verification Key not provided",
            };
            return res.status(400).send(response);
        }
        if (!otp) {
            const response = {Status: "Failure", Details: "OTP not Provided"};
            return res.status(400).send(response);
        }
        if (!check) {
            const response = {Status: "Failure", Details: "Check not Provided"};
            return res.status(400).send(response);
        }

        let decoded;

        //Check if verification key is altered or not and store it in variable decoded after decryption
        try {
            decoded = await decode(verification_key);
        } catch (err) {
            const response = {Status: "Failure", Details: "Bad Request"};
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

        const otp_instance = await OTP.findOne({where: {id: obj.otp_id}});

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

                        const sheet = new Sheet(sheetID.student_sheet);
                        const student_instance = await sheet.findDetailsByEmail(check);

                        const response = {
                            Status: "Success",
                            Details: "OTP Matched",
                            name: student_instance.name,
                            email: student_instance.email,
                            roll_no: student_instance.rollNo,
                        };

                        let userId = check; // get from db
                        let role = "student";

                        /* a new session has been created.
                         * - an access & refresh token has been attached to the response's cookie
                         * - a new row has been inserted into the database for this new session
                         */
                        await Session.createNewSession(res, userId, {role});

                        return res.status(200).send(response);
                    } else {
                        const response = {Status: "Failure", Details: "OTP NOT Matched"};
                        return res.status(400).send(response);
                    }
                } else {
                    const response = {Status: "Failure", Details: "OTP Expired"};
                    return res.status(400).send(response);
                }
            } else {
                const response = {Status: "Failure", Details: "OTP Already Used"};
                return res.status(400).send(response);
            }
        } else {
            const response = {Status: "Failure", Details: "Bad Request"};
            return res.status(400).send(response);
        }
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

// @route /authenticate/official/register
// @desc Register for a official
exports.registerOfficial = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        if (!name) {
            const response = {
                Status: "Failure",
                Details: "Name not provided",
            };
            return res.status(400).send(response);
        }
        if (!email) {
            const response = {
                Status: "Failure",
                Details: "Email not provided",
            };
            return res.status(400).send(response);
        }
        if (!password) {
            const response = {Status: "Failure", Details: "Password not Provided"};
            return res.status(400).send(response);
        }
        //TODO: check for roles through array
        if (!role) {
            const response = {
                Status: "Failure",
                Details: "Role of User not Provided",
            };
            return res.status(400).send(response);
        }

        let user_instance = await Official.findAll({where: {email: email}});
        console.log(user_instance);
        if (user_instance !== null) {
            const is_present = isPresent(user_instance, role);

            if (!is_present) {
                const encoded_password = await encode(password);

                const details = {
                    name,
                    email,
                    password: encoded_password,
                    status: false,
                    role,
                };
                console.log(encoded_password);
                user_instance = await Official.create(details);

                await Session.createNewSession(res, email, {role});

                const response = {
                    Status: "Success",
                    Details: "User Created and logged in",
                };
                return res.status(200).send(response);
            } else {
                const response = {
                    Status: "Failure",
                    Details: "User Already Exists,Please Login",
                };
                return res.status(400).send(response);
            }
        } else {
            const encoded_password = await encode(password);

            const details = {
                name,
                email,
                password: encoded_password,
                status: false,
                role,
            };
            console.log(encoded_password);
            user_instance = await Official.create(details);

            await Session.createNewSession(res, email, {role});

            const response = {
                Status: "Success",
                Details: "User Created and logged in",
            };
            return res.status(200).send(response);
        }
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

//@route /authenticate/official/login
//@desc Login an official

exports.loginOffical = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        if (!email) {
            const response = {
                Status: "Failure",
                Details: "Email not provided",
            };
            return res.status(400).send(response);
        }
        if (!password) {
            const response = {Status: "Failure", Details: "Password not Provided"};
            return res.status(400).send(response);
        }
        //TODO: check for roles through array
        if (!role) {
            const response = {
                Status: "Failure",
                Details: "Role of User not Provided",
            };
            return res.status(400).send(response);
        }

        let user_instance = await Official.findOne({
            where: {email: email, role: role},
        });

        if (user_instance !== null) {
            if (user_instance.status) {
                try {
                    var decoded_password = await decode(user_instance.password);
                } catch (err) {
                    const response = {Status: "Failure", Details: "Bad Request"};
                    return res.status(400).send(response);
                }
                if (role === user_instance.role) {
                    if (password === decoded_password) {
                        const response = {
                            Status: "Success",
                            Details: "Logged In",
                            name: user_instance.name,
                            email: user_instance.email,
                            role: user_instance.role,
                        };

                        await Session.createNewSession(res, email, {role});

                        res.status(200).send(response);
                    } else {
                        const response = {
                            Status: "Failure",
                            Details: "Incorrect Password, Please try again",
                        };
                        return res.status(400).send(response);
                    }
                } else {
                    const response = {
                        Status: "Failure",
                        Details: "Role for this email does not exist, Please try again",
                    };
                    return res.status(400).send(response);
                }
            } else {
                const response = {
                    Status: "Failure",
                    Details: "Registration not yet confirmed, Please try after some time",
                };
                return res.status(400).send(response);
            }
        } else {
            const response = {
                Status: "Failure",
                Details: "User does not exist, Register First",
            };
            return res.status(400).send(response);
        }
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
