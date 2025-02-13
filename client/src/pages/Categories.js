import React, { useState, useEffect } from "react";
import useCategory from "../hooks/useCategory";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  console.log(categories);
  useEffect(() => {}, []);
  return (
    <div>
      <Layout>
        <h1>ALL CATEGORIES</h1>
        <div className="container">
          <div className="row">
            {categories.map((c) => (
              <>
                <div className="card col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                  <ul className="list-group list-group-flush">
                    <Link
                      to={`/category/${c.slug}`}
                      className="list-group-item btn btn-primary"
                    >
                      {c.name}
                    </Link>
                  </ul>
                </div>
              </>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Categories;
