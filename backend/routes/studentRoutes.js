const express = require("express");
const {
  addPlacedStudent,
  getPlacedStudents,
  deleteStudent
} = require("../controllers/studentController");

const router = express.Router();

router.post("/placed", addPlacedStudent);
router.get("/placed", getPlacedStudents);
// For general access or future expansion
router.get("/", getPlacedStudents);
router.delete("/:id", deleteStudent);

module.exports = router;
