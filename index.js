const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Logger = require("./utils/logger");
const { connectDB, closeDB, sequelize } = require("./utils/connection");

const app = express();
app.use(cors());
dotenv.config();
app.use(morgan("tiny"));

const testRoute = require("./routes/test");
const Student = require("./models/Student");
const  Event= require("./models/Event");

app.use("/", testRoute);

const port = process.env.PORT || 8000;
sequelize
  .sync()
  .then(
    app.listen(port, () => {
      Logger.info(`App started. Listening on port ${port}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
