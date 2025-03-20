import React from "react";
import "./Home.css";
import ecoLanka from "../../assets/images/5.png";
import luxuryStay from "../../assets/images/4.png";
import image2 from "../../assets/images/8.png";
import image3 from "../../assets/images/7.png";
import image4 from "../../assets/images/14.png";
import galleryVideo from "../../assets/images/video1.mp4";


const Home = () => {
  return (
    <div className="home">
      {/* Header Image Section */}
      <section className="heros-image">
        <video src={galleryVideo} autoPlay muted loop className="top-banner" />
        <div className="overlay-text">
          <h1>Welcome to Mahaweli Tours</h1>
          <p>Explore Sri Lanka with us!</p>
        </div>
      </section>

      <div className="hero-section">
        <div className="hero-image-container">
          <img
            src={require("../../assets/images/6.png")}
            alt="Hero Background"
            className="hero-image"
          />
        </div>
        <div className="hero-content">
          <h1>Explore Sri Lanka with Mahaweli Tours</h1>
          <p>
            Discover the hidden gems, cultural wonders, and natural beauty of Sri Lanka. Your dream adventure awaits.
            We offer a variety of travel packages designed to cater to every traveler’s needs, whether you're looking for
            thrilling adventure, serene relaxation, or cultural immersion.
          </p>
          <button className="cta-button">Start Your Journey</button>
        </div>
      </div>

      {/* Creative Images Section with Text */}
      <div className="creative-images">
        <div className="image-text-left">
          <img src={image2} alt="Explore Nature" className="creative-image" />
          <div className="text-content">
            <h2>Explore Nature</h2>
            <p>
              Dive into the lush green jungles and scenic landscapes of Sri Lanka. Nature lovers will find an abundance
              of beauty at every turn. Sri Lanka is home to several national parks and nature reserves, offering visitors
              the chance to experience some of the most biodiverse ecosystems on the planet.
            </p>
          </div>
        </div>

        <div className="image-text-right">
          <div className="text-content">
            <h2>Adventure Awaits</h2>
            <p>
              Embark on thrilling adventures like hiking, white-water rafting, and more. Sri Lanka is home to exciting
              experiences that will challenge your spirit! From the highlands to the coastline, there is no shortage of
              adrenaline-pumping activities for those seeking adventure.
            </p>
          </div>
          <img src={image3} alt="Adventure Awaits" className="creative-image" />
        </div>

        <div className="image-text-left">
          <img src={image4} alt="Luxury and Comfort" className="creative-image" />
          <div className="text-content">
            <h2>Luxury and Comfort</h2>
            <p>
              From beachfront resorts to luxurious mountain retreats, Sri Lanka offers the perfect mix of relaxation and
              opulence for every traveler. Enjoy world-class amenities, exquisite service, and the tranquil beauty of the
              island as you unwind in style.
            </p>
          </div>
        </div>

        <div className="image-text-right">
          <div className="text-content">
            <h2>Cultural Heritage</h2>
            <p>
              Discover Sri Lanka's rich cultural heritage through its ancient temples, monuments, and traditions. A
              journey through history awaits. Sri Lanka is known for its well-preserved historical sites, such as
              Anuradhapura, Polonnaruwa, and Sigiriya, which date back centuries and provide insight into the country’s
              ancient civilizations.
            </p>
          </div>
          <img src={ecoLanka} alt="Cultural Heritage" className="creative-image" />
        </div>

        <div className="image-text-left">
          <img src={luxuryStay} alt="Exquisite Stays" className="creative-image" />
          <div className="text-content">
            <h2>Exquisite Stays</h2>
            <p>
              Experience luxury like never before. Whether in a 5-star hotel or a serene resort, Sri Lanka has some of
              the finest accommodations. Whether you're looking for beachfront villas, hilltop hideaways, or urban escapes,
              Sri Lanka offers something to suit every style and preference.
            </p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <section className="about-us">
        <h2 className="section-title">Why Choose Mahaweli Tours?</h2>
        <p>
          With years of experience, we craft unforgettable travel experiences. Whether you're seeking adventure or
          relaxation, we offer the best of Sri Lanka. Our tailored itineraries are designed to provide you with a truly
          unique experience.
        </p>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2025 Mahaweli Tours. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;