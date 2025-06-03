const express = require('express');
const router = express.Router();
const { addOrder } = require('../controllers/orderController');

router.post('/orders', addOrder);

module.exports = router;
