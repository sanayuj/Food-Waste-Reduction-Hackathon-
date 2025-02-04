const express = require("express");
const adminAuth = require("../Middleware/AdminAuth");
const { adminLogin, adminHeader, userList, DonationList, EnterNewNgo, listNGO } = require("../Controllers/adminController");

const router = express.Router(); 



router.post("/login",adminLogin);
router.post("/newNgo",EnterNewNgo)

router.get("/adminHeader",adminAuth,adminHeader)
router.get("/userList",adminAuth,userList)
router.get("/DonationList",adminAuth,DonationList)
router.get("/getNGODetails",listNGO)
module.exports = router;