const express = require('express');
const router = express.Router();
const { previewAudience, createCampaign, getCampaigns } = require('../controllers/campaignController');

router.post('/campaigns/preview', previewAudience);
router.post('/campaigns/create', createCampaign);
router.get('/campaigns', getCampaigns);

module.exports = router;
