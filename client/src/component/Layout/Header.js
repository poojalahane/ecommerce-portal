import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput.js";
import useCategory from "./../../hooks/useCategory";
import { useCart } from "../../context/cart.js";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const navigate = useNavigate();
  const [cart] = useCart();
  //console.log(categories);
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <span>
                <TiShoppingCart />
              </span>{" "}
              Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  to={"/categories"}
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Cateogories
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li>
                      <Link
                        to={`/category/${c.slug}`}
                        className="dropdown-item"
                        href="#"
                      >
                        {/* {console.log(c.name)} */}
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link ">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="nav-item">
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link "
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link ">
                    Cart {cart.length}
                  </NavLink>
                </Badge>
              </li>
            </ul>
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
