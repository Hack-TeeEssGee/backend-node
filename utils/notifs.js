const axios = require("axios");

exports.createNotif = async (title, content) => {
    try {
        var headers = {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Basic ${process.env.AUTH_TOKEN_ONESIGNAL}`,
        };

        const msg = {
            contents: {en: title},
            headings: {en: content},
            included_segments: ["Subscribed Users"],
            app_id: process.env.APP_ID,
        };

        await axios.post("https://onesignal.com/api/v1/notifications", msg, {headers});
    } catch (err) {
        console.log(err.message);
    }
};
