const express = require("express");

const router = express.Router();

const {applyForInternship,getMyApplications,getApplicants,updateApplicationStatus} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

router.post("/:internshipId",protect, checkRole("student"), applyForInternship);
router.get("/my", protect, getMyApplications);
router.get("/internship/:internshipId", protect, checkRole("student"), getApplicants);
router.put("/:applicationId/status", protect, checkRole("student"), updateApplicationStatus);

module.exports = router;