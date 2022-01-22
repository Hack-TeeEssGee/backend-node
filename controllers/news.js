const { News } = require("../utils/connection");

exports.getAllNews = async (req, res) => {
    try {
        const news_list = await News.findAll();
        const response = {Status: "Success", Details: "All News Loaded", news: news_list};
        return res.status(200).send(response);
    } catch (err) {
        const response = {Status: "Failure", Details: err.message};
        return res.status(400).send(response);
    }
};
