const { upload } = require("../utils/s3-config");
const singleUpload = upload.single("image");

exports.uploadCertificate = (req, res) => {
  res.send("Document getting uploaded");
};
