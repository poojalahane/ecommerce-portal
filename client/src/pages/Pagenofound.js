import React from "react";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenofound = () => {
  return (
    <div>
      <Layout title={"go-back page not found"}>
        <div className="pnf">
          <h1 className="pnf-title">404</h1>
          <h1 className="pnf-heading">Oops ! Page Not Found</h1>
          <Link to="/" className="pnf-btn">
            Go Back
          </Link>
        </div>
      </Layout>
    </div>
  );
};

export default Pagenofound;
