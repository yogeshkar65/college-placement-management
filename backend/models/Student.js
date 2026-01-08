const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    companyPlaced: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
