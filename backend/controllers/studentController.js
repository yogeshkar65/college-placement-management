const Student = require("../models/Student");

exports.addStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getPlacedStudents = async (req, res) => {
  try {
    const students = await Student.find({ companyPlaced: { $ne: null } });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
