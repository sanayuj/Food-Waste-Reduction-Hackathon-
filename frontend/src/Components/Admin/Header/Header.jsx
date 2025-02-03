import React, { useEffect ,useState} from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../../Features/setAdmin";
import { adminHeader } from "../../../Services /adminApi";
function Header() {
  const dispatch = useDispatch();
  const [admin,setAdmin]=useState()
  useEffect(() => {
    adminHeader()
      .then((res) => {
        console.log(res.data,"%^%^%^56");
        
        setAdmin(res.data.adminDetails)
        dispatch(setAdminDetails(res.data.adminDetails));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid mx-5">
       <p><b>Admin portal</b></p> 
          <Link className="navbar-brand mx-3" to="/admin/">
             <span >Admin</span>
          </Link>
          {admin ? (
            <span >
              <Link to="/admin/login" className="text-danger text-decoration-none">Logout</Link>
            </span>
          ) : null}
        </div>
      </nav>
    </div>
  );
}

export default Header;
