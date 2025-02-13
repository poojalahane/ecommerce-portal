import React, { useState } from "react";
import Layout from "./../../component/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    newPassword: "",
  });
  const [auth, setAuth] = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(" ");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        formData
      );
      alert(response.data.message);

      navigate("/login");
      console.log(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Forgot Password - Ecommerce App"}>
      <div className="form-container">
        <h1>Forget Password Page...</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter your Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.answer}
              onChange={handleChange}
              name="answer"
              placeholder="Enter your Answer"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.newPassword}
              onChange={handleChange}
              name="newPassword"
              placeholder="Enter your New Password"
            />
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
