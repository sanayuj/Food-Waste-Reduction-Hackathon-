;
const { type } = require("os");


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
Date:{
    default: Date.now

}
}
)


module.exports=new mongoose.module("NgoList",AddNgo);