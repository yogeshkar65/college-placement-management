const express = require("express");
const router = express.Router();

const {
  addDrive,
  getAllDrives,
  getUpcomingDrives,
  getPastDrives
} = require("../controllers/driveController");

router.post("/", addDrive);
router.get("/", getAllDrives);
router.get("/upcoming", getUpcomingDrives);
router.get("/past", getPastDrives);

module.exports = router;
