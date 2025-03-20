import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* Logo Section */}
        <div className="box logo">
          <h1>TravelNest</h1>
          <span>Your Adventure Awaits</span>
          <p>
            Discover the world with us! Your journey starts here, filled with unforgettable experiences.
          </p>
        </div>

        {/* Links Section */}
        <div className="box link">
          <h3>Explore</h3>
          <ul>
            <li>Destinations</li>
            <li>Tours</li>
            <li>Packages</li>
            <li>Travel Tips</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* Customer Care Section */}
        <div className="box link">
          <h3>Customer Care</h3>
          <ul>
            <li>FAQ</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Feedback</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="box contact">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 198, Main Street, Galle, Sri Lanka
            </li>
            <li>
              <i className="fas fa-phone-alt"></i> +94 35 2355 198
            </li>
            <li>
              <i className="fas fa-envelope"></i> support@travelnest.com
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="social-icons">
        <i className="fab fa-facebook-f icon"></i>
        <i className="fab fa-twitter icon"></i>
        <i className="fab fa-instagram icon"></i>
        <i className="fab fa-linkedin icon"></i>
      </div>

      {/* Legal Section */}
      <div className="legal">
        <p>Copyright ©2024 TravelNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;