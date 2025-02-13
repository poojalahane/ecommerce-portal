import React, { useState } from "react";
import Layout from "./../../component/Layout/Layout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
    address: "",
    answer: "",
  });

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
        "http://localhost:5000/api/v1/auth/register",
        formData
      );
      alert(response.data.message);
      console.log(response.data.user);
      setLoading(false);
      setFormData({
        name: "",
        phone: "",
        password: "",
        email: "",
        address: "",
        answer: "",
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Register - Ecommerce App"}>
      <div className="form-container">
        <h1 className="title">Register Page...</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Your Name."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={formData.email}
              onChange={handleChange}
              name="email"
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone.."
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address.."
              value={formData.address}
              onChange={handleChange}
              name="address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="YOUR BEST FRIEND NAME.."
              value={formData.answer}
              onChange={handleChange}
              name="answer"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
