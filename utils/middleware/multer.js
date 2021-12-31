const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");

//configuring the AWS environment
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
});

var s3 = new AWS.S3();

//configuring parameters

//certificate upload middleware
exports.upload_certificate = multer({
    storage: multerS3({
        s3: s3,
        bucket: "kgpverse-certificates",
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "certificate/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//event upload middleware
exports.upload_event = multer({
    storage: multerS3({
        s3: s3,
        bucket: "kgpverse-events",
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "event/" + Date.now() + "_" + file.originalname);
        },
    }),
});
