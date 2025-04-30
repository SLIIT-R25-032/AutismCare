const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LearningSession",
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    default: "Learning Session Details",
  },
  body: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Email", EmailSchema);
