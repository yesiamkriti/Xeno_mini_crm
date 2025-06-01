const express = require("express");
// const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();
const {
  previewSegment,
  saveSegment,
  getSegments
} = require("../controllers/segmentController");

router.post("/segments/preview", previewSegment);
router.post("/segments", saveSegment);
// router.post("/segments",isAuthenticated, saveSegment);
router.get("/segments", getSegments);

module.exports = router;