import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import UserMenu from "../../component/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    email: "",
    address: "",
  });
  // console.log(auth.user);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //! get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setFormData({ name, email, phone, address });
  }, [auth?.user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(" ");
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/auth/profile",
        formData
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully..");
        console.log(data?.updateUser);
      }
      // navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - My Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <Layout title={"Register - Ecommerce App"}>
              <div className="form-container">
                <h1 className="title">USER PROFILE</h1>
                <form onSubmit={submitHandler}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter Your Name."
                      value={formData.name}
                      onChange={handleChange}
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
                      disabled
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
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    UPDATE
                  </button>
                </form>
              </div>
            </Layout>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
