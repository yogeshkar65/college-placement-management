const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Company = require("./models/Company");
const Drive = require("./models/Drive");
const Student = require("./models/Student");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected for Seeding");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        // Clear existing data
        await Company.deleteMany({});
        await Drive.deleteMany({});
        await Student.deleteMany({});
        console.log("Cleared existing data");

        // 1. Create Companies
        const companiesData = [
            { name: "Google", role: "Software Engineer", package: "24 LPA", status: "upcoming" },
            { name: "Microsoft", role: "SDE II", package: "28 LPA", status: "upcoming" },
            { name: "Amazon", role: "SDE I", package: "20 LPA", status: "upcoming" },
            { name: "Zoho", role: "Product Developer", package: "8 LPA", status: "upcoming" },
            { name: "TCS", role: "System Engineer", package: "7 LPA", status: "upcoming" },
            { name: "Infosys", role: "Specialist Programmer", package: "9 LPA", status: "upcoming" },
            { name: "Wipro", role: "Project Engineer", package: "6.5 LPA", status: "upcoming" },
            { name: "Accenture", role: "App Developer", package: "6 LPA", status: "upcoming" },
            { name: "IBM", role: "Software Developer", package: "10 LPA", status: "upcoming" },
            { name: "Cognizant", role: "GenC Next", package: "6.7 LPA", status: "upcoming" },
            { name: "Capgemini", role: "Senior Analyst", package: "7.5 LPA", status: "upcoming" },
            { name: "HCL", role: "Member Technical Staff", package: "8 LPA", status: "upcoming" }
        ];

        const companies = await Company.insertMany(companiesData);
        console.log(`Seeded ${companies.length} Companies`);

        // Helper to get company ID by name
        const getComp = (name) => companies.find(c => c.name === name);

        // Dynamic Date Logic for 2026+ compatibility
        const now = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const oneMonth = 30 * oneDay;

        // 2. Create Upcoming Drives (Future dates relative to NOW)
        const upcomingDrivesData = [
            {
                company: getComp("Google")._id,
                date: new Date(now.getTime() + oneMonth * 1), // Next month
                time: "10:00 AM",
                eligibility: ["CSE", "IT", "ECE"],
                interviewQuestions: []
            },
            {
                company: getComp("Microsoft")._id,
                date: new Date(now.getTime() + oneMonth * 2), // 2 months from now
                time: "09:00 AM",
                eligibility: ["CSE", "IT"],
                interviewQuestions: []
            },
            {
                company: getComp("Zoho")._id,
                date: new Date(now.getTime() + oneMonth * 0.5), // 15 days from now
                time: "11:00 AM",
                eligibility: ["All Branches"],
                interviewQuestions: []
            },
            {
                company: getComp("Amazon")._id,
                date: new Date(now.getTime() + oneMonth * 3),
                time: "02:00 PM",
                eligibility: ["CSE", "IT", "ECE", "EEE"],
                interviewQuestions: []
            },
            {
                company: getComp("TCS")._id,
                date: new Date(now.getTime() + oneMonth * 1.5),
                time: "10:30 AM",
                eligibility: ["All Branches"],
                interviewQuestions: []
            },
            {
                company: getComp("Infosys")._id,
                date: new Date(now.getTime() + oneMonth * 4),
                time: "09:30 AM",
                eligibility: ["CSE", "IT", "ECE"],
                interviewQuestions: []
            },
            {
                company: getComp("Wipro")._id,
                date: new Date(now.getTime() + oneMonth * 5),
                time: "10:00 AM",
                eligibility: ["CSE", "IT", "ECE", "EEE"],
                interviewQuestions: []
            },
            {
                company: getComp("Accenture")._id,
                date: new Date(now.getTime() + oneMonth * 2.5),
                time: "11:00 AM",
                eligibility: ["All Branches"],
                interviewQuestions: []
            }
        ];

        await Drive.insertMany(upcomingDrivesData);
        console.log(`Seeded ${upcomingDrivesData.length} Upcoming Drives`);

        // 3. Create Past Drives (Past dates relative to NOW)
        const pastDrivesData = [
            {
                company: getComp("TCS")._id,
                date: new Date(now.getTime() - oneMonth * 1), // 1 month ago
                time: "09:00 AM",
                eligibility: ["All Branches"],
                interviewQuestions: ["Difference between C and C++?", "Explain OOPs concepts", "Write a program for Fibonacci series"]
            },
            {
                company: getComp("Wipro")._id,
                date: new Date(now.getTime() - oneMonth * 2),
                time: "10:00 AM",
                eligibility: ["CSE", "IT", "ECE"],
                interviewQuestions: ["Tell me about yourself", "Explain your project", "What is dbms?"]
            },
            {
                company: getComp("Accenture")._id,
                date: new Date(now.getTime() - oneMonth * 3),
                time: "11:00 AM",
                eligibility: ["All Branches"],
                interviewQuestions: ["Why Accenture?", "Strengths and Weaknesses", "Aptitude questions on Train problems"]
            },
            {
                company: getComp("Zoho")._id,
                date: new Date(now.getTime() - oneMonth * 4),
                time: "09:30 AM",
                eligibility: ["CSE", "IT"],
                interviewQuestions: ["Reverse a string without built-in function", "Design a vending machine system", "Explain normalization"]
            },
            {
                company: getComp("Infosys")._id,
                date: new Date(now.getTime() - oneMonth * 5),
                time: "10:00 AM",
                eligibility: ["All Branches"],
                interviewQuestions: ["SQL query to find second highest salary", "Difference between Abstract class and Interface", "Puzzle solving"]
            },
            {
                company: getComp("Google")._id,
                date: new Date(now.getTime() - oneMonth * 12), // 1 year ago
                time: "10:00 AM",
                eligibility: ["CSE", "IT"],
                interviewQuestions: ["Trapping Rain Water problem", "System Design of a URL shortener", "Concurrency in Java"]
            },
            {
                company: getComp("Microsoft")._id,
                date: new Date(now.getTime() - oneMonth * 14),
                time: "09:00 AM",
                eligibility: ["CSE", "IT"],
                interviewQuestions: ["Design a parking lot", "Lowest Common Ancestor in Binary Tree", "Operating System concepts"]
            }
        ];

        await Drive.insertMany(pastDrivesData);
        console.log(`Seeded ${pastDrivesData.length} Past Drives`);

        // 4. Create Placed Students
        const studentsData = [
            { name: "John Doe", studentId: "71001", department: "CSE", company: getComp("Google")._id },
            { name: "Jane Smith", studentId: "71002", department: "IT", company: getComp("Microsoft")._id },
            { name: "Mike Ross", studentId: "71003", department: "ECE", company: getComp("TCS")._id },
            { name: "Rachel Green", studentId: "71004", department: "EEE", company: getComp("Wipro")._id },
            { name: "Harvey Specter", studentId: "71005", department: "CSE", company: getComp("Amazon")._id },
            { name: "Donna Paulsen", studentId: "71006", department: "IT", company: getComp("Zoho")._id },
            { name: "Louis Litt", studentId: "71007", department: "MECH", company: getComp("Infosys")._id },
            { name: "Jessica Pearson", studentId: "71008", department: "CIVIL", company: getComp("Accenture")._id },
            { name: "Alex Williams", studentId: "71009", department: "CSE", company: getComp("IBM")._id },
            { name: "Samantha Wheeler", studentId: "71010", department: "IT", company: getComp("Cognizant")._id }
        ];

        await Student.insertMany(studentsData);
        console.log(`Seeded ${studentsData.length} Placed Students`);

        console.log("Database seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
