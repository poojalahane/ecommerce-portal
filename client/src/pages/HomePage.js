import React, { useState, useEffect } from "react";
import Layout from "../component/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../component/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data.success) {
        setProducts(data.products);
      }
      //console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/get-all"
      );
      if (data.success) {
        setCategories(data.category);
        //console.log(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  //! get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //! load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
    }
  };

  //! filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //! get fitered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Products -Best Offers"}>
      <div className="container-fluid row" mt-3>
        <div className="col-md-2">
          <h3 className="text-center">Filter By Category</h3>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h3 className="text-center mt-4">Filter By Price</h3>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map((p) => (
                <Radio value={p.array}>{p.name}</Radio>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          {/* {JSON.stringify(checked, null, 4)}
          {JSON.stringify(radio, null, 4)} */}
          <h1 className="text-center">ALL products</h1>
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
                    <button
                      href="#"
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart successfully..");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="m-2 p-3">
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
          </div>
        </div>
      </div>

      {/* <h1>Hompage Page</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre> */}
    </Layout>
  );
};

export default HomePage;
