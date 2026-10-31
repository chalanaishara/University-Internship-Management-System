
const Internship = require("../models/internship");


// CREATE INTERNSHIP
const createInternship = async (req, res) => {
    try {

        const {
            title,
            company,
            category,
            location,
            internshipType,
            description,
            responsibilities,
            requiredSkills,
            educationRequirements,
            minimumGPA,
            numberOfVacancies,
            duration,
            startDate,
            isPaid,
            monthlyAllowance,
            benefits,
            applicationDeadline,
            contactEmail,
            additionalInstructions
        } = req.body;


        // Required field validation
        if (
            !title ||
            !company ||
            !category ||
            !location ||
            !description ||
            !responsibilities ||
            !requiredSkills ||
            !duration ||
            !applicationDeadline ||
            !contactEmail
        ) {
            return res.status(400).json({
                message: "Please fill all required fields."
            });
        }


        // Validate vacancies
        if (
            !Number.isInteger(Number(numberOfVacancies)) ||
            Number(numberOfVacancies) < 1
        ) {
            return res.status(400).json({
                message: "Number of vacancies must be at least 1."
            });
        }


        // Validate GPA
        if (
            minimumGPA !== "" &&
            minimumGPA !== null &&
            minimumGPA !== undefined &&
            (
                !Number.isFinite(Number(minimumGPA)) ||
                Number(minimumGPA) < 0 ||
                Number(minimumGPA) > 4
            )
        ) {
            return res.status(400).json({
                message: "GPA must be between 0 and 4."
            });
        }


        // Validate application deadline
        const deadline = new Date(applicationDeadline);

        if (isNaN(deadline.getTime())) {
            return res.status(400).json({
                message: "Invalid application deadline."
            });
        }


        // Create internship
        const internship = await Internship.create({

            title,
            company,
            category,
            location,
            internshipType,

            description,
            responsibilities,
            requiredSkills,

            educationRequirements,
            minimumGPA:
                minimumGPA === "" || minimumGPA == null
                    ? null
                    : Number(minimumGPA),

            numberOfVacancies: Number(numberOfVacancies),
            duration,
            startDate: startDate || null,

            isPaid:
                isPaid === true ||
                isPaid === "true",

            monthlyAllowance: Number(monthlyAllowance) || 0,
            benefits,

            applicationDeadline: deadline,
            contactEmail,
            additionalInstructions,

            // Logged-in company user ID
            createdBy: req.user.userId,

            status: "PUBLISHED"

        });


        res.status(201).json({
            message: "Internship created successfully.",
            internship
        });

    } catch (error) {

        console.error("Create internship error:", error);

        res.status(500).json({
            message: "Failed to create internship.",
            error: error.message
        });
    }
};



// GET ALL PUBLISHED INTERNSHIPS
// Used by students
const getInternships = async (req, res) => {
    try {

        const internships = await Internship.find({
            status: "PUBLISHED"
        }).sort({ createdAt: -1 });

        res.status(200).json(internships);

    } catch (error) {

        console.error("Get internships error:", error);

        res.status(500).json({
            message: "Failed to get internships."
        });
    }
};



// GET COMPANY'S OWN INTERNSHIPS
// Used by MyInternships and Applicants pages
const getMyInternships = async (req, res) => {
    try {

        const internships = await Internship.find({
            createdBy: req.user.userId
        }).sort({ createdAt: -1 });

        res.status(200).json(internships);

    } catch (error) {

        console.error("Get my internships error:", error);

        res.status(500).json({
            message: "Failed to get your internships."
        });
    }
};



// GET SINGLE INTERNSHIP
const getInternship = async (req, res) => {
    try {

        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found."
            });
        }

        res.status(200).json(internship);

    } catch (error) {

        console.error("Get internship error:", error);

        res.status(500).json({
            message: "Failed to get internship."
        });
    }
};



// UPDATE INTERNSHIP
const updateInternship = async (req, res) => {
    try {

        const allowedFields = [
            "title",
            "company",
            "category",
            "location",
            "internshipType",
            "description",
            "responsibilities",
            "requiredSkills",
            "educationRequirements",
            "minimumGPA",
            "numberOfVacancies",
            "duration",
            "startDate",
            "isPaid",
            "monthlyAllowance",
            "benefits",
            "applicationDeadline",
            "contactEmail",
            "additionalInstructions"
        ];


        // Only allow approved editable fields
        const updateData = {};

        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });


        // Update only if internship belongs to logged-in company
        const internship = await Internship.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user.userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );


        if (!internship) {
            return res.status(404).json({
                message: "Internship not found or you are not authorized."
            });
        }


        res.status(200).json({
            message: "Internship updated successfully.",
            internship
        });

    } catch (error) {

        console.error("Update internship error:", error);

        res.status(500).json({
            message: "Failed to update internship.",
            error: error.message
        });
    }
};



// DELETE INTERNSHIP
const deleteInternship = async (req, res) => {
    try {

        // Delete only if internship belongs to logged-in company
        const internship = await Internship.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.userId
        });


        if (!internship) {
            return res.status(404).json({
                message: "Internship not found or you are not authorized."
            });
        }


        res.status(200).json({
            message: "Internship deleted successfully."
        });

    } catch (error) {

        console.error("Delete internship error:", error);

        res.status(500).json({
            message: "Failed to delete internship."
        });
    }
};



module.exports = {
    createInternship,
    getInternships,
    getMyInternships,
    getInternship,
    updateInternship,
    deleteInternship
};
