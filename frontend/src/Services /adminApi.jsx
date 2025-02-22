import { adminInstance } from "../Axios/axiosInstance";



export const adminLogin = (values) => {
  console.log("AdminLogin",values);
  
    return adminInstance.post("/login", { ...values });
  };
  export const adminHeader = () => {
    return adminInstance.get("/adminHeader");
  };
  
  export const userList = () => {
    return adminInstance.get("/userList");
  };

  export const listDonation=()=>{
    return adminInstance.get("/DonationList");
  }

  export const enterNewNGO=(values)=>{
    return adminInstance.post("/newNgo",values)
  }

  export const listNgo=()=>{
    return adminInstance.get("/getNGODetails")
  }

  export const allowNgo=(ngoId)=>{
    return adminInstance.post("/AllowNgo",ngoId)
  }