const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
const path = require("path");
const DonationModel = require("../Model/DonationModel");
const NgoModel = require("../Model/NgoModel");




const createAdminToken = (id) => {
    return jwt.sign({ id }, "adminJWT", {
      expiresIn: maxAge,
    });
  };
  
  module.exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        console.log("$$$");
        
      const admin = await adminModel.findOne({ email });
      if (admin) {
        console.log("admin found!");
        
        const adminAuth = await bcrypt.compare(password, admin.password);
        if (adminAuth) {
          console.log("Inside the auth");
          
          const adminToken = createAdminToken(admin._id);
          return res.json({
            message: "login successfully",
            status: true,
            token: adminToken,
            adminDetails: admin,
          });
        }
        return res.json({ message: "Invaild password", status: false });
      }
      return res.json({ message: "Admin not found", status: false });
    } catch (error) {
      console.log(error);
      return res.json({ message: "Internal server error", status: false });
    }
  };
  module.exports.adminHeader = async (req, res, next) => {
    try {
      const user = req.admin;
      return res.json({ adminDetails: user, status: false });
    } catch (error) {
      return res.json({
        message: "Internal server error in fetech admin details",
        status: false,
      });
    }
  };

  module.exports.userList = async (req, res, next) => {
    try {
      const userDetails = await userModel.find({});
  
      if (userDetails) {
        return res.json({ userDetails, status: true });
      } else {
        return res.json({ message: "User not found", status: false });
      }
    } catch (error) {
      console.log(error);
      res.json({ message: "Internal server error in list user", status: false });
    }
  };


  module.exports.DonationList = async (req, res, next) => {
    try {
      const DonationDetails = await DonationModel.find({}).populate({
        path: "userId",
        model: "user",
        select: "userName email username",
      });;
  
      if (DonationDetails) {
        return res.json({ DonationDetails, status: true });
      } else {
        return res.json({ message: "Data not found", status: false });
      }
    } catch (error) {
      console.log(error);
      res.json({ message: "Internal server error in list Donation Details", status: false });
    }
  };


  module.exports.EnterNewNgo=async(req,res,next)=>{
    try{
console.log("hehheheheh",req.body);
      const newNgo=await NgoModel.findOne({PhoneNumber:req.body.contact})
if(newNgo){
 return res.json({message:"NGO already registered !",status:false})
}
const newRegister=new NgoModel({
  Name:req.body.name,
  Location:req.body.location,
  PhoneNumber:req.body.contact
})
await newRegister.save();
return res.json({message:"New NGO Registered",status:true})
return 
    }catch(error){
      return res.json({message:"Error occur while submiting",status:false})
    }
  }

  module.exports.listNGO=async(req,res)=>{
    try{
    const NGODetais=await NgoModel.find({})
    if(NGODetais){
      console.log(NGODetais,"NNNNGGGGOOO");
      
     return res.json({message:"Data fetch successfully",data:NGODetais,status:true})
    }
    return res.json({message:"Empty ",status:false})
  }catch(err){
    console.log(err);
    
 return res.json({message:"Error occur while fetching",status:false})
  }}