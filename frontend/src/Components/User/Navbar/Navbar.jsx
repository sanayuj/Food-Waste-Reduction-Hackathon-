import React, { useEffect,useState } from "react";
import "./Navbar.css"
import {useDispatch,useSelector} from 'react-redux'
import {Link, useNavigate } from 'react-router-dom'

import { setUserDetails } from "../../../Features/setUser";
import { userHeader } from "../../../Services /userApi";
function Navbar() {
      //const [certificate, setCertificate] = useState([]);
     
     const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
     const navigate = useNavigate();
  
    useEffect(() => {
        userHeader()
          .then((res) => {
           
            console.log(res?.data,"####!!");
            
            if (res?.data?.status) {
              dispatch(setUserDetails(res.data.userDetails));
            }
          })
          .catch((err) => {
            console.log(err);
          });
        
      }, [dispatch]);
  return (
   
    <div> <nav>
    <ul>
      <li>
      <Link to="/">
    <p>Home</p>
  </Link>
      </li>
      
      <li>
  <Link to="/dash">
    <p>Dashboard</p>
  </Link>
</li>
{/* <li>
        <a >About</a>
      </li> */}

    </ul>
   
    <div className="user-actions">
          {user ? (
            <span className="username">Welcome, {user.username}</span>
          ) : (
            <Link to="/login" id="login" className="loginColor">
              <i className="fas fa-user"></i> Login
            </Link>
          )}
          {user ? (
            <button
              className="logoutBtn"
              onClick={() => {
                localStorage.removeItem("jwt");
                dispatch(setUserDetails(""));
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <button className="loginBtn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
       

  </nav></div>
  )
}

export default Navbar