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

const testRoute = require("./routes/test");

const port = process.env.PORT || 8000;

app.use("/", testRoute);

app.listen(port, () => {
  Logger.info(`App started. Listening on port ${port}`);
});
