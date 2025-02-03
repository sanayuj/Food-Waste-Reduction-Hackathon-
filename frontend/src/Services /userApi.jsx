import {userInstance} from "../Axios/axiosInstance"

export const userLogin = (values) => {
    console.log(values,"!!!!!")
    return userInstance.post("/login", { ...values });
  };


  export const userSignup=(values)=>{
    console.log(values,"######");
    return userInstance.post("/Signup",{...values});
  }

  export const userHeader=()=>{
    return userInstance.get("/userHeader");
  }

  export const userFoodDonate=(values)=>{
    console.log(values,"&&&&&&");
    
    return userInstance.post("/userFoodDonate",{...values})
  }

  export const DonationInfo=()=>{
    return userInstance.get("/UserDonationInfo");
  }