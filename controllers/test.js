const { connectDB, closeDB } = require("../utils/connection");

exports.testDB = (req, res) => {
  connectDB();
  closeDB();
  res.send("KGPverse api service working.").status(200);
};
