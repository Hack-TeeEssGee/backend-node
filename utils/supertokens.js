let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
const Logger = require("./logger");

const initSupertokens = () => {

    supertokens.init({
        framework: "express",
        supertokens: {
            // These are the connection details of the app you created on supertokens.io
            connectionURI: process.env.SUPERTOKENS_URI,
            apiKey: process.env.SUPERTOKENS_KEY,
        },
        appInfo: {
            // learn more about this on https://supertokens.io/docs/session/appinfo
            appName: "kgpverse",
            apiDomain: process.env.BACKEND_URL,
            websiteDomain: process.env.FRONTEND_URL
        },
        recipeList: [
            Session.init()
        ]
    });
    Logger.info('Supertokens connected.');
}

exports.initSupertokens = initSupertokens;