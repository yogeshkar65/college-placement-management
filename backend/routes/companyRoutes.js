const express = require("express");
const router = express.Router();
const { addCompany, getCompanies, deleteCompany } = require("../controllers/companyController");

router.post("/", addCompany);
router.get("/", getCompanies);
router.delete("/:id", deleteCompany);

module.exports = router;
