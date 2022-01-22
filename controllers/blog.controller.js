const {report} = require("../routes/info");
const {message, subject_mail} = require("../template/report_mail");
const {Blog} = require("../utils/connection");
const nodemailer = require("nodemailer");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({attributes: ["id", "name", "body", "email", "title", "createdAt"]});

        const response = {Status: "Success", Details: "All Blogs Returned", blogs};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.addBlog = async (req, res) => {
    try {
        const {name, email, title, body} = req.body;
        await Blog.create({name, email, title, body});

        const response = {Status: "Success", Details: "Blog Added"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.reportBlog = async (req, res) => {
    try {
        const {id, email} = req.body;
        const blog_instance = await Blog.findOne({where: {id}});

        let report_arr = JSON.parse(blog_instance.reports);
        report_arr.push(email);
        let report_set = new Set(report_arr);
        const new_report_arr = [...report_set];
        blog_instance.reports = JSON.stringify(new_report_arr);

        blog_instance.save();

        if (new_report_arr.length === 5) {
            email_message = message(blog_instance.title, blog_instance.name);
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
                to: process.env.EMAIL_ADDRESS,
                subject: email_subject,
                text: email_message,
            };

            await transporter.verify();

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    return res.status(400).send({Status: "Failure", Details: err});
                } else {
                    return res.send({Status: "Success", Details: encoded});
                }
            });
        }
        const response = {Status: "Success", Details: "Successfully Reported"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.destroy({where: {id}});

        const response = {Status: "Success", Details: "Blog deleted"};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
