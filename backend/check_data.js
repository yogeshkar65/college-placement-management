const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("./models/Company");
const Drive = require("./models/Drive");
const Student = require("./models/Student");

dotenv.config();

const checkData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");

        const companies = await Company.countDocuments();
        const drives = await Drive.countDocuments();
        const students = await Student.countDocuments();

        console.log(`Companies: ${companies}`);
        console.log(`Drives: ${drives}`);
        console.log(`Students: ${students}`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkData();
