import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Dashboard.css";
import { DonationInfo, userFoodDonate } from "../../../Services /userApi";
import { toast } from "react-toastify";

function Dashboard() {
const [data,addData]=useState()
  useEffect(()=>{
    DonationInfo().then((res)=>{
      console.log(res?.data?.donationInfo,"******____");
      addData(res?.data)
      
    }).catch((err)=>{
      console.log(err);
    })
  },[data?.donationInfo])
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    foodName: Yup.string().min(3, "Food Name must be at least 3 characters").required("Food Name is required"),
    location: Yup.string().required("Location is required"),
    quantity: Yup.number().positive("Quantity must be greater than 0").required("Quantity is required"),
  });

  // Submit function to handle the API call
  const submit = async (values) => {
    try {
      console.log(values,"#####");
      
      const { data } = await userFoodDonate(values);
      // Handle response data (e.g., success or error message)
      console.log(data);
      if (data.status) {
        toast.success("Food donation successful!");
      } else {
        toast.error("Food donation failed!");
      }
    } catch (error) {
      console.error("Error submitting food donation:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 sidebar">
          <h2 className="mb-4">User Panel</h2>
          <ul className="list-unstyled">
            <li><Link to="/request-food">Request Food</Link></li>
            <li><Link to="/available-food">Available Food Near Me</Link></li>
            <li><Link to="/track-status">Track Request Status</Link></li>
            <li><Link to="/profile">Profile Management</Link></li>
            <li><Link to="/map-view">Map View</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 main-content">
          <h1 className="mb-4">User Dashboard</h1>

          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Donate Food</h5>
                  {/* Button to open modal */}
                  <button className="btn btn-primary" onClick={() => setShowModal(true)}>Donate Food</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Available Food Near Me</h5>
                  <button className="btn btn-success">View Food</button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mb-3">Track Request Status</h2>
         
  {/* <table className="table table-bordered">
    <thead>
      <tr>
        <th>Request ID</th>
        <th>Food Item</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>R001</td>
        <td>10 Meals</td>
        <td><span className="badge bg-warning">Pending</span></td>
      </tr>
      <tr>
        <td>R002</td>
        <td>5 Sandwiches</td>
        <td><span className="badge bg-success">Delivered</span></td>
      </tr>
    </tbody>
  </table> */}
  {data?.donationInfo && data.donationInfo.length > 0 ? (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Request ID</th>
        <th>Food Item</th>
        <th>Location</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {data.donationInfo.map((item, index) => (
        <tr key={index}>
          <td>RR{index+1}</td>
          <td>{item.FoodName}</td>
          <td>{item.Location}</td>
          <td>
          <span className={`badge ${item.Status === "Pending" ? "bg-warning" : "bg-success"}`}>
  {item.Status}
</span>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-center text-muted">No Data Found</p>
)}


          <h2 className="mb-3">Map View</h2>
          <div className="card">
            <div className="card-body">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.4419409954654!2d75.70289711500812!3d31.255096681457366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a438d5bbbcf%3A0x89880c0d8de67472!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1706687865432!5m2!1sen!2sin
"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Donate Food</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <Formik
                  initialValues={{ foodName: "", location: "", quantity: "" }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    // Call the submit function passing the form values
                    submit(values);
                    resetForm();
                    setSubmitting(false);
                    setShowModal(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Food Name */}
                      <div className="mb-3">
                        <label htmlFor="foodName" className="col-form-label">Food Name:</label>
                        <Field type="text" name="foodName" className="form-control" />
                        <ErrorMessage name="foodName" component="div" className="text-danger" />
                      </div>

                      {/* Location */}
                      <div className="mb-3">
                        <label htmlFor="location" className="col-form-label">Location:</label>
                        <Field type="text" name="location" className="form-control" />
                        <ErrorMessage name="location" component="div" className="text-danger" />
                      </div>

                      {/* Quantity */}
                      <div className="mb-3">
                        <label htmlFor="quantity" className="col-form-label">Quantity:</label>
                        <Field type="number" name="quantity" className="form-control" />
                        <ErrorMessage name="quantity" component="div" className="text-danger" />
                      </div>

                      {/* Modal Footer */}
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit Donation</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close modal when clicking outside */}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}
    </div>
  );
}

export default Dashboard;
