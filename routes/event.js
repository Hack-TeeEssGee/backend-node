const router = require("express").Router();
const {uploadTSGEvent, getAllEvents, getTodaysEvents, uploadSocEvent} = require("../controllers/event");
const {upload_event} = require("../utils/middleware/multer");

router.post("/tsg/upload", upload_event.single("image"), uploadTSGEvent);
router.get("/", getAllEvents);
router.post("/today", getTodaysEvents);

//get event of partcular society
router.get("/:id", getSocietyEvents);

//upload society event
router.post("/society/upload", upload_event.single("image"), uploadSocEvent);

module.exports = router;
