const express = require('express');
const router = express.Router();
const { handleReceipt } = require('../controllers/receiptController');

router.post('/reciept', handleReceipt);

module.exports = router;
