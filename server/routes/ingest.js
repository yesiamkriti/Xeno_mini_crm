const express = require("express");
const router = express.Router();

const {
  ingestCustomer,
  ingestOrder,
} = require("../controllers/ingestController");

router.post("/customers", ingestCustomer);
router.post("/orders", ingestOrder);

module.exports = router;
