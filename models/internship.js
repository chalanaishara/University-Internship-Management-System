const mongoose=require("mongoose");

const internshipSchema=new mongoose.Schema({
    title:String,
    company:String,
    location:String,
});

module.exports=mongoose.model("Internship",internshipSchema);