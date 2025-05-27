const express = require("express");
const router = express.Router();
const {
  sendCampaign,
  updateReceipt,
  getCampaignHistory
} = require("../controllers/campaignController");

router.post("/campaign/send", sendCampaign);
router.post("/campaign/receipt", updateReceipt);
router.get("/campaign/history", getCampaignHistory);

module.exports = router;
