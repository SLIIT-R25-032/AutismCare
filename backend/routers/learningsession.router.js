const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const learningSessionController = require("../controllers/learningsession.controller");

// Create a new learning session
router.post("/", authenticateUser, learningSessionController.createLearningSession);

// Append a new learning instruction
router.put("/instructions/:id",authenticateUser,learningSessionController.addLearningInstruction);

// Finish the learning session 
router.put("/finish/:id", authenticateUser, learningSessionController.finishLearningSession);

// Get a single learning session by ID (with all details)
router.get("/:id", authenticateUser, learningSessionController.getLearningSession);

// Route for uploading photo and getting detected objects
router.post("/detect-objects", authenticateUser, learningSessionController.uploadPhotoAndDetect);

module.exports = router;
