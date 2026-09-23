const Application = require("../models/Application");

const applyForInternship = async (req, res) => {
    try {
        const application = await Application.create({
            student: req.user.userId,
            internship: req.params.internshipId
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit application"
        });
    }
};


const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            student: req.user.userId
        }).populate("internship");;

        res.json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get applications"
        });
    }
};

const getApplicants = async (req, res) => {
    try {
        const applications = await Application.find({
            internship: req.params.internshipId
        }).populate("student");

        res.json(applications);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get applicants"
        });
    }
};


const updateApplicationStatus = async (req, res) => {
    try {
        const application = await Application.findByIdAndUpdate(
            req.params.applicationId,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.json({
            message: "Application status updated",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application status"
        });
    }
};


module.exports = {applyForInternship, getMyApplications,getApplicants, updateApplicationStatus};