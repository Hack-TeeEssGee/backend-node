const router = require("express").Router();
const {uploadEvent} = require("../controllers/event");
const {upload_event} = require("../utils/middleware/multer");

router.post("/upload", upload_event.single("image"), uploadEvent);

module.exports = router;
