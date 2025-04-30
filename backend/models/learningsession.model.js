const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const learningInstructionSchema = new Schema(
  {
    instructioId: {
      type: Number, 
      required: true,
    },
    quesition: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    wrongAnswer: {
      type: String,
      required: true,
    },
    selectedAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    takenTime: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const LearningSessionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  selectedLocation: {
    type: String,
    default: null,
  },
  detectedObjects: {
    type: String,
    default: null,
  },
  InstructinRecords: {
    type: [learningInstructionSchema],
    default: [],
  },
  finishedSession: {
    type: Boolean,
    default: false,
  },
  currentMood: {
    type: String,
    default: null,
  },
  parentSatisfaction: {
    type: Number,
    default: null,
  },
  engagementLevel: {
    type: Number,
    default: null,
  },
  completedTasks: {
    type: Number,
    default: 0,
  },
  correctInFirstAttempt: {
    type: Number,
    default: 0,
  },
  prediction: {
    type: String,
    default: null,
  },
  suggestions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("LearningSession", LearningSessionSchema);
