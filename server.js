const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express=require("express");
const mongoose=require("mongoose");
const app=express();
const protect=require("./middleware/authMiddleware.js");
const authRoutes=require("./routes/authRoutes.js");
const internshipRoutes=require("./routes/internshipRoutes.js");
const applicationRoutes=require("./routes/applicationRoutes.js");
require("dotenv").config();

app.use(express.json());
app.use("/api/internships", internshipRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/applications",applicationRoutes);



app.get("/api/auth/profile",protect,(req,res)=>{
    res.json({
        message:"You can access this protected route",
        user:req.user
    });

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