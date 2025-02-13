import React from "react";
import Layout from "../component/Layout/Layout";

const Policy = () => {
  return (
    <div>
      <Layout title={"Privacy-Policy"}>
        <div className="privacy-policy-page">
          <div className="jumbotron jumbotron-fluid bg-dark text-white text-center">
            <div className="container">
              <h1 className="display-4">Privacy Policy</h1>
              <p className="lead">
                Your privacy is important to us. Please read our privacy policy
                carefully.
              </p>
            </div>
          </div>

          <div className="container my-5">
            <h2>Introduction</h2>
            <p>
              This privacy policy outlines how we collect, use, and protect your
              personal information when you use our eCommerce website.
            </p>

            <h2>Information We Collect</h2>
            <ul>
              <li>
                <strong>Personal Information:</strong> When you register, place
                an order, or contact us, we may collect personal information
                such as your name, email, shipping address, and payment details.
              </li>
              <li>
                <strong>Usage Data:</strong> We may collect information on how
                you use our website, including your browsing history, IP
                address, and device type.
              </li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To process and fulfill orders</li>
              <li>To improve the customer experience on our website</li>
              <li>
                To communicate with you, including sending promotional emails or
                customer service inquiries
              </li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We take your privacy seriously and use a variety of security
              measures to protect your personal data, including encryption and
              secure payment systems.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may share your information with third-party services that help
              us process orders, payments, and emails. These third parties are
              obligated to protect your data and are not allowed to use it for
              their own purposes.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience.
              Cookies are small data files that are placed on your device. You
              can manage cookie preferences in your browser settings.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal
              information at any time. If you would like to exercise these
              rights, please contact us through our customer service.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes
              will be reflected on this page, and the updated policy will take
              effect immediately upon posting.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this privacy policy,
              please contact us at:
            </p>
            <ul>
              <li>Email: pmrl@ecommerce.com</li>
              <li>Phone: +91 8933284232</li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Policy;
