import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        {/* Logo Section */}
        <div className="box logo">
          <h1>Travel</h1>
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
            <li><i className="fas fa-map-marker-alt"></i> 198, Main Street, Galle, Sri Lanka</li>
            <li><i className="fas fa-phone-alt"></i> +94 35 2355 198</li>
            <li><i className="fas fa-envelope"></i> support@travelnest.com</li>
          </ul>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-icons">
        <a href="https://www.facebook.com/MahaweliTours/" target="_blank" rel="noopener noreferrer" className="icon facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com/mahaweli.lk/" target="_blank" rel="noopener noreferrer" className="icon instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://www.youtube.com/channel/UCSp2pb786590VYoudmVIvaQ" target="_blank" rel="noopener noreferrer" className="icon youtube">
          <i className="fab fa-youtube"></i>
        </a>
      </div>

      {/* Legal Section */}
      <div className="legal">
        <p>© 2024 TravelNest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;