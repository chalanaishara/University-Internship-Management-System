const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express=require("express");
const mongoose=require("mongoose");
//const internships=require("./sample.js");
const app=express();
const Internship=require("./models/internship.js");
const User=require("./models/user.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const protect=require("./middleware/authMiddleware.js");
require("dotenv").config();

app.use(express.json());



app.get("/",(req,res)=>{
    res.send("Welcome to the Internship Management System");
});

app.get("/api/internships", async (req, res) => {
    try {
        const internships = await Internship.find();   
        res.json(internships);
    } catch (error) {
        res.status(500).json({ message: "Error fetching internships", Error: error.message });
    }
});

app.get("/api/internships/:id", async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);

        if (!internship) {
            return res.status(404).json({ message: "Internship not found" });
        }

        res.json(internship);
    } catch (error) {
        res.status(500).json({ message: "Error fetching internship", Error: error.message });
    }
});


app.get("/api/auth/profile",protect,(req,res)=>{
    res.json({
        message:"You can access this protected route",
        user:req.user
    });

});



app.post("/api/internships",async(req,res)=>{
    try{
        const internship=await Internship.create(req.body);
    
    res.json(internship);
    }catch(error){
         console.log("CREATE ERROR:", error);
        res.status(500).json({
            message:"Error creating internships",
            Error:error.message
        });
    }
});

app.delete("/api/internships/:id",async(req,res)=>{
    try{
        await Internship.findByIdAndDelete(req.params.id);

        res.json({
            message:"Internship deleted"
        });

    }catch(error){
        res.status(500).json({
            message:"failed to delete internship"
        });
    }
});

app.post("/api/auth/register",async(req,res)=>{
    try{
        const{name,email,password,role}=req.body;

        const hashedpassword=await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedpassword,
            role
        });

        res.status(201).json({
            message:"User registered successfully",
            user
        });

    }catch(error){
        res.status(500).json({
            message:"failed to register user",
            Error:error.message
        });
    }
});



app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

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
        res.status(500).json({
            message: "Login failed"
        });
    }
});



app.listen(5000,()=>{
    console.log("server is running on port 5000");
});

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB");
}) 
.catch((err)=>{
    console.log("failed to connect to MongoDB",err);
});