const express = require("express");

const router = express.Router();

const {registerUser, loginUser, getUser,updateUser} = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");


router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile",protect, getUser);
router.put("/update",protect,updateUser);


module.exports = router;