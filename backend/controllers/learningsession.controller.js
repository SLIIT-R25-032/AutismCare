const LearningSession = require("../models/learningsession.model");
const User = require("../models/user.model");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Handle file upload and object detection
exports.uploadPhotoAndDetect = [
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = req.file.path;
      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream(filePath),
        req.file.originalname
      );

      console.log("Sending form data:", formData);

      // Send image to external API for object detection
      const response = await axios.post(
        `${process.env.FLASH_BACKEND}/detect_objects/`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            accept: "application/json",
          },
        }
      );

      // Get the detected objects from the response
      const detectedObjects = response.data.detected_objects;

      // Filter detected objects with confidence > 0.5
      const filteredObjects = detectedObjects.filter(
        (obj) => obj.confidence > 0.5
      );

      // Use a Set to keep track of the unique class names
      const uniqueClasses = new Set();

      // Filter out duplicates by class (only keep the first occurrence of each class)
      const uniqueObjects = filteredObjects
        .filter((obj) => {
          if (!uniqueClasses.has(obj.class)) {
            uniqueClasses.add(obj.class);
            return true;
          }
          return false;
        })
        // Remove bbox from the final response
        .map((obj) => {
          const { bbox, ...rest } = obj;
          return rest;
        });

      // Return the final unique objects with confidence > 0.5 and only one object per class
      res.status(200).json({ detectedObjects: uniqueObjects });
    } catch (error) {
      console.error("Error during external API request:", error);
      res.status(500).json({ error: error.message });
    }
  },
];

// Create a new learning session (user has logged in and selected a place)
exports.createLearningSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const { selectedLocation, detectedObjects } = req.body;
    const newSession = new LearningSession({
      user: userId,
      selectedLocation,
      detectedObjects,
    });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Append a new learning instruction to the session (using PUT method)
exports.addLearningInstruction = async (req, res) => {
  try {
    const sessionId = req.params.id;
    // Expecting the instruction object in the request body.
    const instruction = req.body;
    const session = await LearningSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Learning session not found" });
    }
    // Push new instruction to the array (without replacing existing ones)
    session.InstructinRecords.push(instruction);
    await session.save();
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Finish the learning session and get the prediction
exports.finishLearningSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const {
      finishedSession,
      currentMood,
      parentSatisfaction,
      engagementLevel,
    } = req.body;

    // Fetch the learning session
    let session = await LearningSession.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Learning session not found" });
    }
    if (finishedSession !== true) {
      return res.status(400).json({
        message: "finishedSession flag must be true to complete the session",
      });
    }

    // Update session details
    session.finishedSession = true;
    session.currentMood = currentMood;
    session.parentSatisfaction = parentSatisfaction;
    session.engagementLevel = engagementLevel;

    // Calculate total takenTime and average takenTime
    const totalTime = session.InstructinRecords.reduce(
      (acc, record) => acc + record.takenTime,
      0
    );
    const averageTime =
      session.InstructinRecords.length > 0
        ? totalTime / session.InstructinRecords.length
        : 0;

    // Calculate completed tasks and count of correct answers on first attempt
    const completedTasks = session.InstructinRecords.length;
    const correctInFirstAttempt = session.InstructinRecords.filter(
      (record) => record.isCorrect === true
    ).length;

    // Update the session fields for tasks and correct attempts
    session.completedTasks = completedTasks;
    session.correctInFirstAttempt = correctInFirstAttempt;

    // Get user details (Age and Gender) from the User model
    const user = await User.findById(session.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Construct the payload for the prediction API
    const predictPayload = {
      Age: user.age || 0,
      Gender: user.gender || "",
      Current_Mood: currentMood,
      Parent_Satisfaction: parentSatisfaction,
      Engagement_Level: engagementLevel,
      Completed_Tasks: completedTasks,
      Time_Spent: totalTime,
      Correct_in_First_Attempt: correctInFirstAttempt,
    };

    console.log("Prediction Payload: ", predictPayload);

    // Call the prediction API
    let prediction, suggestions;
    try {
      const predictResponse = await axios.post(
        `${process.env.FLASH_BACKEND}/predict`,
        predictPayload
      );
      prediction = predictResponse.data.prediction;
      suggestions = predictResponse.data.suggestions;
      session.prediction = prediction;
      session.suggestions = suggestions;
    } catch (axiosError) {
      console.error(
        "Prediction API error: ",
        axiosError.response ? axiosError.response.data : axiosError.message
      );
      return res.status(500).json({
        error: "Prediction API call failed",
        details: axiosError.response
          ? axiosError.response.data
          : axiosError.message,
      });
    }

    // Save the session with updated values, prediction, and suggestions
    await session.save();

    res.status(200).json({
      session,
      totalTime,
      averageTime,
      currentMood,
      parentSatisfaction,
      engagementLevel,
      completedTasks,
      correctInFirstAttempt,
      prediction,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single learning session by its ID
exports.getLearningSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await LearningSession.findById(sessionId).populate(
      "user",
      "-password"
    );
    if (!session) {
      return res.status(404).json({ message: "Learning session not found" });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
