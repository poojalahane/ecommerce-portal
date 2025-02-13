import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //! get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      console.log(cid);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`
      );
      console.log(data);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //! get Product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-single/${params.slug}`
      );
      if (data.success) {
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category);
      }
      //console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  // console.log(product);
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <>
            <img
              src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
              height={300}
              width={"350px"}
            />
          </>
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          {/* <h6>Category : {product.category}</h6> */}
          {/* <h6>Shipping : {product.shipping}</h6> */}
          <h6>Quantity : {product.quantity}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <div className="row container">
        <h2>Similar Product</h2>
        {relatedProducts.length < 1 && (
          <p className="text-center">NO SIMILAR PRODUCTS FOUND</p>
        )}
        {/* {JSON.stringify(relatedProducts, null, 4)} */}
        <div className="d-flex flex-wrap">
          {relatedProducts.map((p) => (
            <>
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
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
      </div>

      {/* <h1>Product Detatils</h1>
      {JSON.stringify(product, null, 4)} */}
    </Layout>
  );
};

export default ProductDetails;
