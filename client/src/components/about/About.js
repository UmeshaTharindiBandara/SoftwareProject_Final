import React from "react";
import './About.css';
import galleryImage from "../../assets/images/10.jpg";
// Correct paths to your images

const tourImage02 = require('../../assets/images/tour-img02.jpg');
const tourImage03 = require('../../assets/images/tour-img03.jpg');
const tourImage04 = require('../../assets/images/tour-img04.jpg');
const tourImage05 = require('../../assets/images/tour-img05.jpg');
const tourImage06 = require('../../assets/images/tour-img06.jpg');
const tourImage07 = require('../../assets/images/tour-img07.jpg');
const tourImage08 = require('../../assets/images/tour-img08.jpg');

const About = () => {
  return (
    <>
      {/* Full-width image for visual appeal */}
      <section className="header-image">
      <img src={galleryImage} alt="Gallery" className="top-banner" />
        <div className="overlay-text">
          <h1>Explore Sri Lanka</h1>
          <p>Discover the beauty, culture, and adventures of Sri Lanka through our curated blog.</p>
        </div>
      </section>    

      <section className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              We are a passionate team of travel enthusiasts dedicated to creating unforgettable experiences for explorers around the world. Our mission is to connect you with the wonders of the world, from bustling cities to serene natural landscapes.
            </p>
            <p>
              With years of expertise in the travel industry, we pride ourselves on offering curated itineraries that cater to all types of travelers. Whether you're seeking adventure, culture, or relaxation, we've got you covered.
            </p>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To provide travelers with unique, memorable journeys that ignite a sense of wonder and foster a deeper connection to the world. We believe in sustainable travel that supports local communities and protects the environment.
        </p>

        {/* Mission Cards with Large Icons */}
        <div className="mission-cards">
          <div className="mission-card">
            <i className="fas fa-handshake fa-4x"></i> {/* Integrity Icon */}
            <h3>Integrity</h3>
            <p>We are transparent and honest with our customers, partners, and each other.</p>
          </div>
          <div className="mission-card">
            <i className="fas fa-globe-americas fa-4x"></i> {/* Adventure Icon */}
            <h3>Adventure</h3>
            <p>We believe in pushing boundaries and seeking new horizons in every experience.</p>
          </div>
          <div className="mission-card">
            <i className="fas fa-leaf fa-4x"></i> {/* Sustainability Icon */}
            <h3>Sustainability</h3>
            <p>Our goal is to preserve the beauty of our planet for future generations to enjoy.</p>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Core Values</h2>
        <div className="values-container">
          <div className="value">
            <img src={tourImage03} alt="Tour Image 3" />
            <h3>Integrity</h3>
            <p>We are transparent and honest with our customers, partners, and each other.</p>
          </div>
          <div className="value">
            <img src={tourImage04} alt="Tour Image 4" />
            <h3>Adventure</h3>
            <p>We believe in pushing boundaries and seeking new horizons in every experience.</p>
          </div>
          <div className="value">
            <img src={tourImage05} alt="Tour Image 5" />
            <h3>Sustainability</h3>
            <p>Our goal is to preserve the beauty of our planet for future generations to enjoy.</p>
          </div>
        </div>
      </section>

      <section className="gallery-section">
        <h2>Explore Our Gallery</h2>
        <div className="gallery-container">
          <img src={tourImage02} alt="Tour Image 2" data-aos="zoom-in" />
          <img src={tourImage03} alt="Tour Image 3" data-aos="zoom-in" />
          <img src={tourImage04} alt="Tour Image 4" data-aos="zoom-in" />
          <img src={tourImage05} alt="Tour Image 5" data-aos="zoom-in" />
          <img src={tourImage06} alt="Tour Image 6" data-aos="zoom-in" />
          <img src={tourImage07} alt="Tour Image 7" data-aos="zoom-in" />
          <img src={tourImage08} alt="Tour Image 8" data-aos="zoom-in" />
        </div>
      </section>
    </>
  );
};

export default About;