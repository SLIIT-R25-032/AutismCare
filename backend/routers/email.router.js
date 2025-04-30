const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller");
const authenticateUser = require("../middleware/authMiddleware");

// Send email with user progress
router.post("/send", authenticateUser, emailController.sendSessionEmail );

module.exports = router;
