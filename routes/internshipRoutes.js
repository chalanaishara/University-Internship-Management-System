const express = require("express");

const router = express.Router();

const {
    createInternship,
    getInternships,
    getInternship,
    updateInternship,
    deleteInternship
} = require("../controllers/internshipController");

const protect = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");


router.post(
    "/",
    protect,
     checkRole("company"),
    createInternship
);


router.get(
    "/",
    getInternships
);


router.get(
    "/:id",
    getInternship
);


router.put(
    "/:id",
    protect,
    checkRole("company"),
    updateInternship
);


router.delete(
    "/:id",
    protect,
    deleteInternship
);


module.exports = router;