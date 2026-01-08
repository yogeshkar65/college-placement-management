const express = require("express");
const router = express.Router();
const { addStudent, getPlacedStudents } = require("../controllers/studentController");

router.post("/", addStudent);
router.get("/placed", getPlacedStudents);

module.exports = router;
