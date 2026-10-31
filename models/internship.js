
const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({

    // 01. Basic Information
    title: {
        type: String,
        required: true,
        trim: true
    },

    company: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    internshipType: {
        type: String,
        enum: ["On-site", "Remote", "Hybrid"],
        default: "On-site"
    },


    // 02. Job Description
    description: {
        type: String,
        required: true
    },

    responsibilities: {
        type: String,
        required: true
    },

    requiredSkills: {
        type: String,
        required: true
    },


    // 03. Requirements
    educationRequirements: {
        type: String,
        default: ""
    },

    minimumGPA: {
        type: Number,
        min: 0,
        max: 4,
        default: null
    },


    // 04. Internship Details
    numberOfVacancies: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },

    duration: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        default: null
    },


    // 05. Compensation & Benefits
    isPaid: {
        type: Boolean,
        default: true
    },

    monthlyAllowance: {
        type: Number,
        default: 0,
        min: 0
    },

    benefits: {
        type: String,
        default: ""
    },


    // 06. Application Details
    applicationDeadline: {
        type: Date,
        required: true
    },

    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    additionalInstructions: {
        type: String,
        default: ""
    },


    // 07. Company Ownership
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


    // 08. Internship Status
    status: {
        type: String,
        enum: ["PUBLISHED", "CLOSED"],
        default: "PUBLISHED"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Internship", internshipSchema);
