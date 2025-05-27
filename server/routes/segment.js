const express = require("express");
const router = express.Router();
const {
  previewSegment,
  saveSegment,
  getSegments
} = require("../controllers/segmentController");

router.post("/segments/preview", previewSegment);
router.post("/segments", saveSegment);
router.get("/segments", getSegments);

module.exports = router;
