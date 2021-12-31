const router = require("express").Router();
const {uploadEvent, getAllEvents} = require("../controllers/event");
const {upload_event} = require("../utils/middleware/multer");

router.post("/upload", upload_event.single("image"), uploadEvent);
router.get("/", getAllEvents);

module.exports = router;
