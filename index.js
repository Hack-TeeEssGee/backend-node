const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Logger = require("./utils/logger");

//DB connection
const { sequelize } = require("./utils/connection");

//Routes Import
const testRoute = require("./routes/test");

//Models Imports
const authRoute = require("./routes/auth");
const Student = require("./models/Student");
const Event = require("./models/Event");

// SuperToken configuration
const { initSupertokens } = require("./utils/supertokens");
let supertokens = require("supertokens-node");
let {
  middleware,
  errorHandler,
} = require("supertokens-node/framework/express");

const app = express();
dotenv.config();
app.use(morgan("tiny"));

//initialise supertokens connection
initSupertokens();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);
app.use(middleware());

app.use("/", testRoute);

app.use("/authenticate", authRoute);

//supertokens error handler
app.use(errorHandler());

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
