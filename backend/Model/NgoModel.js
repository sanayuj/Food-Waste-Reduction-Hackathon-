const mongoose  = require("mongoose");

const AddNgo=new mongoose.Schema({
Name:{
    required:true,
    type:String
},
Location:{
    required:true,
    type:String
},
PhoneNumber:{
    required:true,
    type:Number
},
BlockStatus:{
    type:Boolean,
    default:false
},
DateOfCreation:{
    type:Date,
    default: Date.now
}
}
)


module.exports=new mongoose.model("NgoList",AddNgo);