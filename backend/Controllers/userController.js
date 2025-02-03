const { json, response } = require("express");
const userModel=require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const DonationModel = require("../Model/DonationModel");
const maxAge=3 * 24 * 60 * 60;


const createToken = (id) => {
    return jwt.sign({ id }, "JWT", {
      expiresIn: maxAge,
    });
  };

//LOGIN
module.exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    try {
        console.log(req.body.password,"login data!!!!!")
        console.log(req.body.phoneNumber,"login data!!!!!")
      const user = await userModel.findOne({ phoneNumber });
  
      if (user.BlockStatus) {
        return res.json({
          message: "Admin temporay blocked you!",
          success: false,
        });
      }
  
      if (user) {
        const matchPassword = await bcrypt.compare(password, user.password);
        if (matchPassword) {
          const token = createToken(user._id);
          return res.json({
            message: "Login successfully",
            user: user,
            status: true,
            token,
          });
        } else {
          return res.json({ message: "Invaild password", status: false });
        }
      } else {
        return res.json({ message: "User not found", status: false });
      }
    } catch (error) {
      console.log(error);
      return res.json({ message: "Internal server in login", status: false });
    }
  };



  module.exports.Signup = async (req, res, next) => {
    console.log(req.body.username,"%%%%");
    
    const { username, phoneNumber, email, password, confirmpassword } = req.body;
  
    try {
      const phoneExists = await userModel.findOne({ phoneNumber: phoneNumber });
 
  
      if (phoneExists) {
        console.log("Log");
        
        return res.json({
          message: "Phone number already exists",
          status: false,
        });
      }
  
      const emailExists = await userModel.findOne({ email: email });
  
      if (emailExists) {
        console.log("already exists");
        return res.json({ message: "Email already exists", status: false });
      }
  
      const newUser = new userModel({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });
      await newUser.save();
      const token = createToken(userModel._id);

      return res.json({ message: "Submited successfully", status: true, token });
    } catch (error) {
      console.log(error);
      return res.json({
        message: "Internal server error in sign up",
        status: false,
      });
    }
  };

  module.exports.userHeader = async (req, res, next) => {
    try {
      console.log(req.user, "**");
      const userDetails = req.user;
      return res.json({ userDetails: userDetails, status: true });
    } catch (error) {
      return res.json({ message: "Internal sever error", status: false });
    }
  };

  module.exports.userFoodDonation=async(req,res,next)=>{
    try {
      console.log(req.body,"Backend data ^^^^^^");
      console.log(req.user, "*((((((*");
      const {foodName,location,quantity}=req.body;

      const newDonation=new DonationModel({
        FoodName:foodName,
        Location:location,
        Quantity:quantity,
        userId:req.user._id
      })
      await newDonation.save()
      return res.json({message:"Data stored successfully",status:true})
    } catch (error) {
      return res.json({
        message: "Internal server error in sign up",
        status: false,
      });
    }
  }

  module.exports.getInfoDonation = async (req, res, next) => {
    const userId = req.user._id;
    try {
        // Use findOne if there's only one donation per user, otherwise use find
        const donationInfo = await DonationModel.find({ userId });

        if (donationInfo.length > 0) {
            return res.json({ message: "Success", donationInfo, status: true });
        } else {
            return res.json({ message: "Empty", status: false });
        }
    } catch (error) {
        console.error("Error fetching donation info:", error);
        return res.status(500).json({
            message: "Internal server error in showing donation Info",
            status: false,
        });
    }
};
