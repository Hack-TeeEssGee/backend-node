const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const Logger = require("./utils/logger");
const bodyParser = require("body-parser");

//Routes Import
const testRoute = require("./routes/test");
const authRoute = require("./routes/auth");
const certificateRoute = require("./routes/certificate");
const eventRoute = require("./routes/event");
const studentRoute = require("./routes/student");
const societyRoute = require("./routes/society");
const adminRoute = require("./routes/admin");
const tsgRoute = require("./routes/tsg");
const infoRoute = require("./routes/info");

// SuperToken configuration
const {initSupertokens} = require("./utils/supertokens");
let supertokens = require("supertokens-node");
let {middleware, errorHandler} = require("supertokens-node/framework/express");

//Middleware configuration
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());

//initialise supertokens connection
initSupertokens();

//cors configuration
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
        credentials: true,
    })
);
app.use(middleware());

//Routes
app.use("/", testRoute);
app.use("/authenticate", authRoute);
app.use("/certificate", certificateRoute);
app.use("/event", eventRoute);
app.use("/student", studentRoute);
app.use("/society", societyRoute);
app.use("/admin", adminRoute);
app.use("/tsg", tsgRoute);
app.use("/info", infoRoute);

//supertokens error handler
app.use(errorHandler());

//Starting App
const port = process.env.PORT || 8000;
app.listen(port, () => {
    Logger.info(`App started. Listening on port ${port}`);
});
