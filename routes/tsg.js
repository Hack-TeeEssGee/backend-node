const {getSolvedGrievence, getPendingGrievence} = require("../controllers/grievence");
const {getOfficeBearers, updateImage} = require("../controllers/tsg");
const {upload_tsg_image} = require("../utils/middleware/multer");

const router = require("express").Router();

router.get("/solved/grievence", getSolvedGrievence);
router.get("/pending/grievence", getPendingGrievence);
router.get("/office", getOfficeBearers);
router.post("/upload/image", upload_tsg_image.single("image"), updateImage);

module.exports = router;
