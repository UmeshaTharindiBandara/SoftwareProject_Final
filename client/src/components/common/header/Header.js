import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Dark/Light mode icons
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [loggedInUser] = useState(null); // Change state to manage logged-in user
  const [message, setMessage] = useState(""); // Corrected state initialization for message
  const [messageType, setMessageType] = useState(""); // Corrected state initialization for messageType
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  const showMessageTemporarily = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  useEffect(() => {
    // Check if dark mode preference is saved in local storage
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  useEffect(() => {
    // Save dark mode preference to local storage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <header>
        <nav className="flexSB">
          <div className="logo">
            <h1>
              <MdTravelExplore className="icon" /> Mahaweli Tours{" "}
            </h1>
          </div>

          <ul
            className={click ? "mobile-nav" : "flexSB"}
            onClick={() => setClick(false)}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              <Link
                to="/tour"
                onClick={(e) => {
                  if (!loggedInUser) {
                    e.preventDefault();
                    showMessageTemporarily(
                      "Please log in to access Tour Packages.",
                      "error"
                    );
                    navigate("/signup");
                  }
                }}
              >
                Tour Packages
              </Link>
            </li>
          </ul>

          <div className="header-actions">
            {!loggedInUser ? (
              <Link to="/signup" className="btn-signin">
                Sign In
              </Link>
            ) : (
              <Link to="/profile" className="btn-profile">
                <FaUserCircle className="profile-icon" />
              </Link>
            )}
            <button onClick={toggleDarkMode} className="btn-dark-mode">
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
