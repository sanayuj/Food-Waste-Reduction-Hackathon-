import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Landing.css"
function Landing() {
    const navigate=useNavigate();
  return (
    <div>{/* Hero Section */}
    <section className="hero-section">
      <div className="container">
        <h1 className="display-4">Fight Food Waste, Feed the Hungry</h1>
        <p className="lead">Join us in reducing food waste and helping those in need.</p>
        <p  className="btn btn-danger btn-lg">Explore Features</p>
      </div>
    </section>

    {/* Features Section */}
    <section id="features" className="feature-section">
      <div className="container">
        <h2 className="text-center mb-5">Features</h2>
        <div className="row">
          {/* Admin Features */}
          <div className="col-md-3">
            <div className="feature-card">
              <h3>Admin</h3>
              <ul className="list-unstyled">
                <li>User Management</li>
                <li>View All Donations</li>
                <li>Analytics & Reports</li>
                <li>Manage Complaints</li>
                <li>Dashboard Overview</li>
              </ul>
            </div>
          </div>

          {/* NGO Features */}
          <div className="col-md-3">
            <div className="feature-card">
              <h3>NGO</h3>
              <ul className="list-unstyled">
                <li>Browse Donations</li>
                <li>Claim Food Donations</li>
                <li>View Distribution Requests</li>
                <li>Distribute Food</li>
                <li>Map Integration</li>
              </ul>
            </div>
          </div>

          {/* Restaurant Features */}
          <div className="col-md-3">
            <div className="feature-card">
              <h3>Restaurant</h3>
              <ul className="list-unstyled">
                <li>Post Food Donations</li>
                <li>Track Donation Status</li>
                <li>View Past Donations</li>
                <li>Manage Profile</li>
                <li>Map View</li>
              </ul>
            </div>
          </div>

          {/* User Features */}
          <div className="col-md-3">
            <div className="feature-card">
              <h3>User</h3>
              <ul className="list-unstyled">
                <li>Request Food</li>
                <li>View Available Food</li>
                <li>Track Request Status</li>
                <li>Profile Management</li>
                <li>Map View</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section id="about" className="bg-light py-5">
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="text-center">
          We are a platform dedicated to reducing food waste and connecting surplus food with those in need. Join us in making a difference!
        </p>
      </div>
    </section>

    {/* Contact Section */}
    {/* <section id="contact" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">Contact Us</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Your Name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Your Email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="3" placeholder="Your Message"></textarea>
          </div>
          <button type="submit" className="btn btn-danger">Send Message</button>
        </form>
      </div>
    </section> */}

    {/* Footer */}
    <footer className="footer">
      <div className="container">
        <p>&copy; 2023 Food Waste Reduction. All rights reserved.</p>
      </div>
    </footer>

    {/* Bootstrap JS */}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  </div>

  )
}

export default Landing