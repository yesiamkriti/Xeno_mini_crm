const express = require("express");
const router = express.Router();
// const isAuthenticated = require("../middleware/isAuthenticated");

const {
  sendCampaign,
  updateReceipt,
  getCampaignHistory
} = require("../controllers/campaignController");

router.post("/campaign/send",sendCampaign);
// router.post("/campaign/send",isAuthenticated, sendCampaign);
router.post("/campaign/receipt", updateReceipt);
router.get("/campaign/history", getCampaignHistory);

module.exports = router;
