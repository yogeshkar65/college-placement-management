const express = require("express");
const router = express.Router();

const {
  addDrive,
  getAllDrives,
  getUpcomingDrives,
  getPastDrives,
  deleteDrive
} = require("../controllers/driveController");

router.post("/", addDrive);
router.get("/", getAllDrives);
router.get("/upcoming", getUpcomingDrives);
router.get("/past", getPastDrives);
router.delete("/:id", deleteDrive);

module.exports = router;
