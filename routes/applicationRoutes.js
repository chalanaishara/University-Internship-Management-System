const express = require("express");

const router = express.Router();

const {applyForInternship,getMyApplications,getApplicants,updateApplicationStatus} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");

router.post("/:internshipId",protect, applyForInternship);
router.get("/my", protect, getMyApplications);
router.get("/internship/:internshipId", protect, getApplicants);
router.put("/:applicationId/status", protect, updateApplicationStatus);

module.exports = router;