const mongoose=require("mongoose");

const applicationSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    internship:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Internship"
    },
    status:{
        type:String,
        default:"pending"
    }
    
});

module.exports=mongoose.model("Application",applicationSchema);