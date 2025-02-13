import React from "react";
import Layout from "../component/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = async (pid) => {
    try {
      let myCard = [...cart];
      let index = myCard.findIndex((item) => item._id === pid);
      myCard.splice(index, 1);
      setCart(myCard);
      localStorage.setItem("cart", JSON.stringify(myCard));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                {`Hello ${auth?.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? " " : "Please Login to Check out"
                    }`
                  : `YOUR CART IS EMPTY`}
              </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {cart.map((p) => (
                <div className="row mb-2 card flex-row">
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100px"
                      height="150px"
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>{p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        removeCartItem(p._id);
                      }}
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payent</p>
              <hr />
              <h4>Total : {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login to Checkout
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CartPage;
