const Internship = require("../models/Internship");

const createInternship = async (req, res) => {
    try {
        const internship = await Internship.create(req.body);

        res.status(201).json(internship);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create internship"
        });
    }
};


const getInternships = async (req, res) => {
    try {
        const internships = await Internship.find();

        res.json(internships);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get internships"
        });
    }
};


const getInternship = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        res.json(internship);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get internship"
        });
    }
};



const updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(internship);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update internship"
        });
    }
};



const deleteInternship = async (req, res) => {
    try {
        await Internship.findByIdAndDelete(req.params.id);

        res.json({
            message: "Internship deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete internship"
        });
    }
};


module.exports = {
    createInternship,
    getInternships,
    getInternship,
    updateInternship,
    deleteInternship
};