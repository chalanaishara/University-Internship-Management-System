
const express = require("express");
const router = express.Router();

const {
    createInternship,
    getInternships,
    getMyInternships,
    getInternship,
    updateInternship,
    deleteInternship
} = require("../controllers/internshipController");

const { protect } = require("../middleware/authMiddleware");


// Company - Get own internships
router.get("/my", protect, getMyInternships);


// Student - Get all published internships
router.get("/", getInternships);


// Company - Create internship
router.post("/", protect, createInternship);


// Get single internship
router.get("/:id", getInternship);


// Company - Update internship
router.put("/:id", protect, updateInternship);


// Company - Delete internship
router.delete("/:id", protect, deleteInternship);


module.exports = router;
