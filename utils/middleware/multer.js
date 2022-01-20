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
        bucket: process.env.PRIVATE_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "certificate/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//event upload middleware
exports.upload_bill = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.PRIVATE_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "bill/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//grievnece upload middleware
exports.upload_grievence = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.PRIVATE_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "grievence/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//event upload middleware
exports.upload_event = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.PUBLIC_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "event/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//add Society logo
exports.upload_society_logo = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.PUBLIC_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "society_logo/" + Date.now() + "_" + file.originalname);
        },
    }),
});

//update TSG Image
//add Society logo
exports.upload_tsg_image = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.PUBLIC_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, "tsg_image/" + file.originalname);
        },
    }),
});

exports.getFileFromS3 = key => {
    const downloadParams = {
        Key: key,
        Bucket: process.env.PRIVATE_BUCKET,
    };
    return s3.getObject(downloadParams).createReadStream();
};
