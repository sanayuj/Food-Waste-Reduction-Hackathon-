import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { enterNewNGO, listDonation, userList,listNgo } from "../../../Services /adminApi";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; // Import Formik components
import * as Yup from "yup";
import { toast } from "react-toastify";


const AdminDashboard = () => {
  const [user, setUser] = useState([]);
  const [ngo,setNgo]=useState([])
  const [donation, setDonation] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ngoData, setNgoData] = useState({ name: "", location: "", contact: "" });

  useEffect(() => {
    listNgo().then((data)=>{
      console.log(data,"^^^^^^^^");
      setNgo(data?.data.data)
    })



    userList()
      .then((res) => {
        setUser(res?.data?.userDetails || []);
        console.log(res?.data?.userDetails[0].BlockStatus,"!!!!!!!!!!");
        
        listDonation().then((res) => {
          setDonation(res?.data?.DonationDetails || []);
        });

      })
      .catch((err) => console.log(err));
  }
  

  
  , []);

  const ngoValidationSchema = Yup.object().shape({
    name: Yup.string().required("NGO Name is required"),
    location: Yup.string().required("Location is required"),
    contact: Yup.string()
      .required("Contact is required")
      .matches(/^[0-9]{10}$/, "Contact must be a valid 10-digit number"),
  }
  )
  const handleSubmit = (values, { resetForm }) => {
    console.log("NGO Data Submitted:", values);
    enterNewNGO(values)
      .then((data) => {
        console.log(data, "$$$%%%%$$$$$");
        resetForm(); // Reset the form after submission
        if(data.data.status){
        return  toast.success(data.data.message)
        }
        toast.error(data.data.message)
        setShowModal(false); // Close the modal
      })
      .catch((err) => toast.error("Unable to submit"));
  }

  const handleChange = (e) => {
    setNgoData({ ...ngoData, [e.target.name]: e.target.value });
  };


  // const handleSubmit = () => {
  //   console.log("NGO Data Submitted:", ngoData);
  //   enterNewNGO(ngoData).then((data)=>{
  //     console.log(data,"$$$%%%%$$$$$");
      
  //   })
  //   setShowModal(false);
  // };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 row-md-12 sidebar bg-primary text-white p-3">
          <h2 className="mb-4">Admin Panel</h2>
          <ul className="list-unstyled">
            <li>
              <button className="btn btn-light w-100" onClick={() => setShowModal(true)}>
                Add NGO
              </button>
            </li>
            <li>
              <a href="#" className="text-white d-block p-2 rounded">
                Reports
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h1 className="mb-4">Admin Dashboard</h1>

          {/* Overview Cards */}
          <div className="row mb-4">
            {[{ title: "Total Users", count: user.length }, { title: "Active Donations", count: donation.length }].map((card, index) => (
              <div key={index} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text fs-3">{card.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* User Management Table */}
          <h2 className="mb-3">NGO Management</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
               
              </tr>
            </thead>
            <tbody>
              {ngo.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.Name}</td>
                  <td>NGO</td>
                  <td>{ngo.BlockStatus ? "Approved" : "Blocked"}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">Approve</button>
                    <button className="btn btn-danger btn-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="mb-3">User Management</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user?.username}</td>
                  <td>User</td>
                  <td>{ngo.BlockStatus ? "Approved" : "Blocked"}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2">Approve</button>
                    <button className="btn btn-danger btn-sm">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 className="mb-3">Donation Tracking</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Si.no</th>
                <th>Distributer</th>
                <th>Food Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donation.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>{donation.userId.username}</td>
                  <td>{donation.FoodName}</td>
                  <td>
                    <span
                      className={`badge ${
                        donation.Status === "Pending"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {donation.Status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary btn-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Adding NGO */}
          {showModal && (
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New NGO</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <Formik
                      initialValues={{ name: "", location: "", contact: "" }}
                      validationSchema={ngoValidationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="mb-3">
                            <label className="col-form-label">NGO Name:</label>
                            <Field
                              type="text"
                              name="name"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">Location:</label>
                            <Field
                              type="text"
                              name="location"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="location"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="mb-3">
                            <label className="col-form-label">Contact No:</label>
                            <Field
                              type="text"
                              name="contact"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="contact"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={isSubmitting}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
