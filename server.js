const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express=require("express");
const mongoose=require("mongoose");
//const internships=require("./sample.js");
const app=express();
const Internship=require("./models/internship.js");
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