const express = require("express");
const { sendQuoteRequest, sendEnrollRequest } = require("../controllers/mailController");

const router = express.Router();

// POST /api/quotes
router.post("/quote", sendQuoteRequest);
router.post("/enroll", sendEnrollRequest);

module.exports = router;