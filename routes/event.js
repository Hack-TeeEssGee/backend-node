const router = require("express").Router();
const {uploadTSGEvent, getAllEvents, getTodaysEvents, uploadSocEvent, getSocietyEvents} = require("../controllers/event");
const {upload_event} = require("../utils/middleware/multer");

router.post("/upload/tsg", upload_event.single("image"), uploadTSGEvent);

router.get("/", getAllEvents);

router.post("/today", getTodaysEvents);

//get event of partcular society
router.get("/:id", getSocietyEvents);

//upload society event
router.post("/upload/society", upload_event.single("image"), uploadSocEvent);

module.exports = router;
