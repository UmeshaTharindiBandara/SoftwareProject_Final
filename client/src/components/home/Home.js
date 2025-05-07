import React from "react";
import "./Home.css";
import ecoLanka from "../../assets/images/26.jpg";
import luxuryStay from "../../assets/images/23.jpg";
import image2 from "../../assets/images/20.jpg";
import image3 from "../../assets/images/21.jpg";
import image4 from "../../assets/images/22.jpg";
import galleryVideo from "../../assets/images/video1.mp4";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaComments, FaFacebook, FaTwitter, FaInstagram, FaQuestionCircle } from "react-icons/fa";
import galleryImage from "../../assets/images/11.jpg"; // Corrected Path
import { Link } from "react-router-dom";
import SriLankaMap from "./Map";

const Home = () => {
  return (
    <div className="home">
      {/* Top Hero Section with Video Background */}
      <section className="hero">
        <video className="hero-video" src={galleryVideo} autoPlay loop muted />
        <div className="hero-overlay">
          <div className="hero-text">
            <h1>Trust <span>Our Experience</span></h1>
            <p className="subtext">A team of professional travel experts</p>
            <Link to="/contact" className="hero-btn">Get in touch</Link>
          </div>
        </div>
      </section>

      {/* Feature Image Grid */}
      

      <div className="hero-section">
  <div className="hero-text-block">
    <h2 className="section-title">Choose Your Destination</h2>
    <p className="section-subtext">
      Experience the beauty of Sri Lanka with Mahaweli Tours. Whether it's misty hills, golden beaches, ancient cities, or vibrant culture—your next adventure starts here.
    </p>
    <Link to="/tour" className="hero-btn">Start Your Journey</Link>
  </div>
  <div className="hero-image-container">
    <SriLankaMap />
  </div>
</div>
{/* Creative Images Section with Text */}
<div className="creative-images">
  <div className="image-text-left">
    <div className="image-wrapper">
      <img src={image2} alt="Explore Nature" className="creative-image" />
    </div>
    <div className="text-content">
      <h2><i className="fa fa-leaf"></i> Explore Nature</h2>
      <p>
        Dive into the lush green jungles and scenic landscapes of Sri Lanka. Nature lovers will find an abundance of beauty at every turn. Sri Lanka is home to several national parks and nature reserves, offering visitors the chance to experience some of the most biodiverse ecosystems on the planet.
      </p>
    </div>
  </div>

  <div className="image-text-right">
    <div className="text-content">
      <h2><i className="fa fa-mountain"></i> Adventure Awaits</h2>
      <p>
        Embark on thrilling adventures like hiking, white-water rafting, and more. Sri Lanka is home to exciting experiences that will challenge your spirit! From the highlands to the coastline, there is no shortage of adrenaline-pumping activities for those seeking adventure.
      </p>
    </div>
    <div className="image-wrapper">
      <img src={image3} alt="Adventure Awaits" className="creative-image" />
    </div>
  </div>

  <div className="image-text-left">
    <div className="image-wrapper">
      <img src={image4} alt="Luxury and Comfort" className="creative-image" />
    </div>
    <div className="text-content">
      <h2><i className="fa fa-bed"></i> Luxury and Comfort</h2>
      <p>
        From beachfront resorts to luxurious mountain retreats, Sri Lanka offers the perfect mix of relaxation and opulence for every traveler. Enjoy world-class amenities, exquisite service, and the tranquil beauty of the island as you unwind in style.
      </p>
    </div>
  </div>

  <div className="image-text-right">
    <div className="text-content">
      <h2><i className="fa fa-university"></i> Cultural Heritage</h2>
      <p>
        Discover Sri Lanka's rich cultural heritage through its ancient temples, monuments, and traditions. A journey through history awaits. Sri Lanka is known for its well-preserved historical sites, such as Anuradhapura, Polonnaruwa, and Sigiriya, which date back centuries and provide insight into the country’s ancient civilizations.
      </p>
    </div>
    <div className="image-wrapper">
      <img src={ecoLanka} alt="Cultural Heritage" className="creative-image" />
    </div>
  </div>

  <div className="image-text-left">
    <div className="image-wrapper">
      <img src={luxuryStay} alt="Exquisite Stays" className="creative-image" />
    </div>
    <div className="text-content">
      <h2><i className="fa fa-cogs"></i> Exquisite Stays</h2>
      <p>
        Experience luxury like never before. Whether in a 5-star hotel or a serene resort, Sri Lanka has some of the finest accommodations. Whether you're looking for beachfront villas, hilltop hideaways, or urban escapes, Sri Lanka offers something to suit every style and preference.
      </p>
    </div>
  </div>
</div>

      
        

      

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Mahaweli Tours. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;