const express = require("express");
const router = express.Router();
const { generateMessages } = require("../controllers/aiController");

router.post("/ai/messages", generateMessages);

module.exports = router;
