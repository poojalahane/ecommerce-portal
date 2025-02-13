import React from "react";
import { useSearch } from "../context/search";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  //console.log(`Found ${values.results}`);

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <>
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 30)}
                      </p>
                      <p className="card-text">$ {p.price}</p>
                      <p className="card-text">{p.quantity}</p>
                      <button href="#" className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button href="#" className="btn btn-secondary ms-1">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
