const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authenticateUser = require("../middleware/authMiddleware");

// Register user
router.post("/register", userController.register);

// Login user
router.post("/login", userController.login);

// Get user details 
router.get("/", authenticateUser, userController.getUserDetails);

// Update user profile 
router.put("/update", authenticateUser, userController.updateProfile);

// Delete user profile 
router.delete("/delete", authenticateUser, userController.deleteProfile);


module.exports = router;
