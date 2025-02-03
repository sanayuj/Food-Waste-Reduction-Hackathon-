const mongoose = require("mongoose");

const FoodDonationSchema = new mongoose.Schema({
  FoodName: {
    type: String,
     required: true,
   
  },
  Location:{
    required: true,
    type: String
  },
  Quantity:{
    required: true,
    type: Number
  },
   
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  Status:{
        type:String,
        default:"Pending"
    }

  
});

module.exports = new mongoose.model("FoodDonationSchema", FoodDonationSchema);
