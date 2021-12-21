const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Logger = require("./utils/logger");
const { connectDB, closeDB } = require("./utils/connection");

const app = express();
app.use(cors());

dotenv.config();

app.use(morgan("tiny"));

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  connectDB();
  closeDB();
  res.send("KGPverse api service working.").status(200);
});

app.listen(port, () => {
  Logger.info(`App started. Listening on port ${port}`);
});
