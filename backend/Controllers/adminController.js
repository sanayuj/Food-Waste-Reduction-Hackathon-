const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const adminModel = require("../Model/adminModel");
const userModel = require("../Model/userModel");
const path = require("path");
const DonationModel = require("../Model/DonationModel");



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
        const adminAuth = await bcrypt.compare(password, admin.password);
        if (adminAuth) {
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