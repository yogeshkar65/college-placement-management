const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    package: {
      type: String
    },
    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
