const express = require('express');
const router = express.Router();
const { googleAuth } = require('../controllers/authController');

router.post('auth/google', googleAuth);

module.exports = router;
