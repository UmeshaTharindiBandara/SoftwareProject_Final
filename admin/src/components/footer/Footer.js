import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>

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