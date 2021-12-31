const router = require("express").Router();
const {uploadEvent, getAllEvents, getTodaysEvents} = require("../controllers/event");
const {upload_event} = require("../utils/middleware/multer");

router.post("/upload", upload_event.single("image"), uploadEvent);
router.get("/", getAllEvents);
router.post("/today", getTodaysEvents);

module.exports = router;
