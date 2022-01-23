const router = require("express").Router();
const {getAllBlogs, addBlog, reportBlog, deleteBlog} = require("../controllers/blog.controller");
const {
    getHallInfo,
    getGCEvents,
    getInterIITEvents,
    getProfData,
    getCDCData,
    getCareerPoint,
    getAcademicPoint,
} = require("../controllers/info");

router.get("/hall", getHallInfo);
router.get("/gc", getGCEvents);
router.get("/interiit", getInterIITEvents);
router.get("/professor", getProfData);
router.get("/cdc", getCDCData);
router.get("/career-point", getCareerPoint);
router.get("/academic-point", getAcademicPoint);

router.get("/blog", getAllBlogs);
router.post("/blog", addBlog);
router.post("/blog/report", reportBlog);
router.delete("/blog", deleteBlog);

module.exports = router;
