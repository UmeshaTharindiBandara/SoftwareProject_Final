import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MdTravelExplore } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { MdDarkMode, MdLightMode } from "react-icons/md"; // Dark/Light mode icons
import { useAuth } from "../../../AuthContext"; // Importing AuthContext for user state
import "./header.css";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Header = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [loggedInUser] = useState(null); // Change state to manage logged-in user
  const [message, setMessage] = useState(""); // Corrected state initialization for message
  const [messageType, setMessageType] = useState(""); // Corrected state initialization for messageType
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode
  const { user, logout } = useAuth();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const toggleContainer = document.querySelector('.toggle-container');
      
      // Update header visibility
      if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      
      // Update scroll state for toggle button styling
      if (currentScrollY > 50) {
        setIsScrolled(true);
        toggleContainer?.classList.add('scrolled');
      } else {
        setIsScrolled(false);
        toggleContainer?.classList.remove('scrolled');
      }
      
      setLastScrollY(currentScrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);


  // Toggle header manually
  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };


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

  const handleLogout = () => {
    logout();
    navigate('/login');
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
     <div className="header-container">
    <div className="toggle-container">
      <button 
        className={`nav-toggle ${isScrolled ? 'scrolled' : ''}`}
        onClick={toggleHeader}
        aria-label="Toggle navigation"
      >
        {isHeaderVisible ? <CloseIcon /> : <MenuIcon />}
      </button>
    </div>
    <header className={`header ${!isHeaderVisible ? 'hidden' : ''}`}>
        <div className="logo">
          <h1>
            <MdTravelExplore className="icon" /> Mahaweli Tours
          </h1>
        </div>

        <nav className="nav">
          <ul
            className={click ? "mobile-nav" : ""}
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
              <Link to="/tour">Tour Packages</Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
        {!user ? (
          <Link to="/login" className="btn-signin">
            Sign In
          </Link>
        ) : (
          <>
            <Link to="/profile" className="btn-profile">
              <FaUserCircle className="profile-icon" />
              <span className="username">{user.name}</span>
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        )}
        <button onClick={toggleDarkMode} className="btn-dark-mode">
          {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
      </header>
      </div>
    </>
  );
};

export default Header;
