import React, { useState } from "react";
import Layout from "./../../component/Layout/Layout";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
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
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        formData
      );
      setLoading(false);
      if (response.data.success) {
        alert(response.data.message);
        setAuth({
          ...auth,
          user: response.data.data.user,
          token: response.data.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data.data));
        navigate(location.state || "/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      alert("Something went wrong");
    }
  };
  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <h1>Login Page...</h1>
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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={formData.password}
              onChange={handleChange}
              name="password"
              placeholder="Enter your Password"
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
              Forgot Password
            </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
