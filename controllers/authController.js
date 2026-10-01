const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role ,mobile} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            mobile
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

         console.log("Email:", email);
        console.log("Password received:", password);

        const user = await User.findOne({ email });

          console.log("User found:", user);

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );


        console.log("Password correct:", isPasswordCorrect);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

const getUser=async (req,res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            message: "User found",
            user
        });

    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            req.body,
            { new: true }
        );

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update user"
        });
    }
};

module.exports = { registerUser, loginUser, getUser,updateUser };