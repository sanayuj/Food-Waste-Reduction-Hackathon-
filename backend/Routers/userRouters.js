const express = require("express");
const router = express.Router();
const userAuth =require("../Middleware/userAuth")
const {
    login,
    userFoodDonation,
    getInfoDonation,
    
  } = require("../Controllers/userController");
const { Signup } = require("../Controllers/userController");
const { userHeader } = require("../Controllers/userController");




  router.post("/login", login);
  router.post("/Signup",Signup);
  router.post("/userFoodDonate",userAuth,userFoodDonation)



  router.get("/userHeader",userAuth,userHeader);
  router.get("/UserDonationInfo",userAuth,getInfoDonation)
module.exports = router;