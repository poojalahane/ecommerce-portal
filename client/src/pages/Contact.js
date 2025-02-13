import React, { useState } from "react";
import Layout from "../component/Layout/Layout";

const Contact = () => {
  // State for form input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real scenario, here you would handle the form submission (e.g., send an email or store the data).
    console.log("Form submitted:", formData);
    alert("Thank you for contacting us. We will get back to you soon!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <Layout title={"Contact-us"}>
        <div className="contact-page">
          <div className="jumbotron jumbotron-fluid bg-primary text-white text-center">
            <div className="container">
              <h1 className="display-4">Contact Us</h1>
              <p className="lead">
                We'd love to hear from you! Reach out to us anytime.
              </p>
            </div>
          </div>

          <div className="container my-5">
            <div className="row">
              <div className="col-md-6">
                <h2>Our Contact Information</h2>
                <p>
                  If you have any questions or need support, feel free to get in
                  touch!
                </p>
                <ul className="list-unstyled">
                  <li>
                    <strong>Email:</strong> pmrl@ecommerce.com
                  </li>
                  <li>
                    <strong>Phone:</strong> +91 8933284232
                  </li>
                  <li>
                    <strong>Address:</strong> Near Commins College, Karve Nagar,
                    Pune, 411052
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="form-control"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows="5"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Contact;
