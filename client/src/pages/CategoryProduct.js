import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, sestCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);
  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-category/${params.slug}`
      );
      sestCategory(data?.category);
      setProducts(data?.products);
      //   console.log(data?.products);
      //   console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Layout>
        <div className="container mt-3">
          <h4 className="text-center">{category?.name}</h4>
          <h6 className="text-center">{products?.length} result found</h6>
          <div className="row">
            <div className="col-md-9">
              {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
              {/* <h1 className="text-center">ALL products</h1> */}
              <div className="d-flex flex-wrap">
                {products.map((p) => (
                  <>
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
                        <button
                          className="btn btn-primary ms-1"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button href="#" className="btn btn-secondary ms-1">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              {/* <div className="m-2 p-3">
                {products && products.length < total && (
                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "loading..." : "Loadmore"}
                  </button>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CategoryProduct;
