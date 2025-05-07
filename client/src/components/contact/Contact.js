import React from "react";
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaComments, FaFacebook, FaTwitter, FaInstagram, FaQuestionCircle, FaYoutube } from "react-icons/fa";
import galleryImage from "../../assets/images/11.jpg";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <>
      {/* Header Image Section */}
      <section className="header-image">
        <img src={galleryImage} alt="Gallery" className="top-banner" />
        <div className="overlay-text">
          <h1>Contact Us</h1>
          <p>We’re just a call, email, or chat away!</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contacts padding">
        <h2 className="contact-title">We’d Love to Hear From You!</h2>
        <p className="contact-subtitle">Whether you have questions or suggestions, reach out to us through your preferred method.</p>

        <div className="contact-grid">
          {/* Contact Cards */}
          {[
            {
              icon: <FaPhoneAlt />,
              title: "Phone Numbers",
              description: "For immediate help:",
              detail: "+9435 2355 198",
            },
            {
              icon: <FaEnvelope />,
              title: "Email Us",
              description: "Drop us a line:",
              detail: "mahawelitours@gmail.com",
            },
            {
              icon: <FaQuestionCircle />,
              title: "FAQs & Help Center",
              description: "Find answers to common questions:",
              linkText: "Visit FAQ",
              linkHref: "/faq",
            },
            {
              icon: <FaComments />,
              title: "Chat",
              description: "Instantly connect with our support team!",
              linkText: "Chat Now",
              linkHref: "/chat",
              isButton: true,
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Visit Us",
              description: "Our headquarters:",
              detail: "198, Main Street, Kandy, Sri Lanka",
            }
          ].map(({ icon, title, description, detail, linkText, linkHref, isButton }, index) => (
            <div className="contact-card" key={index}>
              <div className="icon-container">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              {detail && <p><strong>{detail}</strong></p>}
              {linkText && (
                <Link to={linkHref} className={isButton ? "button" : ""}>
                  {linkText}
                </Link>
              )}
            </div>
          ))}

          {/* Social Media */}
          <div className="contact-card social-media">
            <h3>Follow Us</h3>
            <p>Connect with us on social platforms:</p>
            <div className="social-icons">
              <a href="https://web.facebook.com/MahaweliTours/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://www.youtube.com/channel/UCSp2pb786590VYoudmVIvaQ" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
              <a href="https://www.instagram.com/mahaweli.lk/" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;