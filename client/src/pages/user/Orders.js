import React from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import UserMenu from "../../component/Layout/UserMenu";

const Users = () => {
  return (
    <Layout title={"Dashboard - My Orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>My Orders</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
