const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String
    },
    eligibility: {
      type: [String], // CSE, IT, ECE
      required: true
    },
    interviewQuestions: {
      type: [String]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Drive", driveSchema);
