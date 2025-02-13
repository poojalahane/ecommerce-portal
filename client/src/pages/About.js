import React from "react";
import Layout from "../component/Layout/Layout";

const About = () => {
  return (
    <div>
      <Layout title={"About us - Ecommerce app"}>
        <div className="about-page">
          <div className="jumbotron jumbotron-fluid bg-info text-white text-center">
            <div className="container">
              <h1 className="display-4">About Our Store</h1>
              <p className="lead">
                Discover the best products at unbeatable prices! We bring you
                high-quality items across various categories.
              </p>
            </div>
          </div>

          <div className="container my-5">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Our Mission</h5>
                    <p className="card-text">
                      Our mission is to provide customers with the best online
                      shopping experience, offering quality products and
                      exceptional service at competitive prices.
                    </p>
                    <a href="/learn-more" className="btn btn-primary">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Why Choose Us?</h5>
                    <p className="card-text">
                      We offer a diverse selection of products, from electronics
                      to fashion, with fast shipping and customer service that
                      goes the extra mile to ensure satisfaction.
                    </p>
                    <a href="/shop-now" className="btn btn-primary">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm text-center py-5">
              <div className="card-body">
                <h5 className="card-title">Our Values</h5>
                <p className="card-text">
                  Integrity, reliability, and customer satisfaction are at the
                  core of everything we do. We believe in building long-term
                  relationships with our customers by offering them the best
                  possible products and services.
                </p>
                <a href="/join-us" className="btn btn-primary btn-lg">
                  Join Us Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default About;
