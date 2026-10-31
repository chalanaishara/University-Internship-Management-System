
const Application = require("../models/application");
const Internship = require("../models/internship");

// Student applies for an internship
const applyForInternship = async (req, res) => {
    try {
        const internshipId = req.params.internshipId;
        const studentId = req.user.userId;

        // 1. Check whether internship exists
        const internship = await Internship.findById(internshipId);

        if (!internship) {
            return res.status(404).json({
                message: "Internship not found"
            });
        }

        // 2. Only published internships can accept applications
       if (internship.status !== "PUBLISHED") {
    return res.status(400).json({
        message: "This internship is not available for applications"
    });
}

        // 3. Check application deadline
        if (new Date(internship.applicationDeadline) < new Date()) {
            return res.status(400).json({
                message: "Application deadline has passed"
            });
        }

        // 4. Check duplicate application
        const existingApplication = await Application.findOne({
            student: studentId,
            internship: internshipId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this internship"
            });
        }

        // 5. Create application
        const application = await Application.create({
            student: studentId,
            internship: internshipId
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to submit application"
        });
    }
};


// Get logged-in student's applications
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            student: req.user.userId
        }).populate("internship");

        res.json(applications);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get applications"
        });
    }
};


// Get applicants for a specific internship
const getApplicants = async (req, res) => {
    try {
        const applications = await Application.find({
            internship: req.params.internshipId
        }).populate("student");

        res.json(applications);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to get applicants"
        });
    }
};


// Update application status
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "selected",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.applicationId,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json({
            message: "Application status updated",
            application
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to update application status"
        });
    }
};


module.exports = {
    applyForInternship,
    getMyApplications,
    getApplicants,
    updateApplicationStatus
};
