const express = require("express");
const {
  addPlacedStudent,
  getPlacedStudents,
} = require("../controllers/studentController");

const router = express.Router();

router.post("/", addPlacedStudent);
router.get("/", getPlacedStudents);

module.exports = router;
