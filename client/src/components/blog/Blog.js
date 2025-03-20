// Blog.js
import React, { useState } from "react";
import "./blog.css";
import galleryImage from "../../assets/images/12.jpg";
// Import renamed images from assets/images folder

import islandDiaries from "../../assets/images/about-image.jpg";
import topPlaces from "../../assets/images/beach_bliss.jpeg";
import culinaryAdventures from "../../assets/images/5.jpg";
import budgetTravel from "../../assets/images/11.jpg";
import hiddenGems from "../../assets/images/hidden_gems.jpeg";
import culturalChronicles from "../../assets/images/tour-img01.jpg";
import wildSriLanka from "../../assets/images/wild_sri_lanka.jpeg";
import adventures from "../../assets/images/adventures.jpeg";
import travelerTips from "../../assets/images/traveler_tips.jpeg";
import beachBliss from "../../assets/images/beach_bliss.jpeg";
import dayTrips from "../../assets/images/day_trips.jpeg";
import ecoLanka from "../../assets/images/eco_lanka.jpeg";

// Blog post data
const initialBlogPosts = [
  {
    title: "Island Diaries: Tales from Sri Lanka",
    content:
      "Dive into the vibrant tales of Sri Lanka, from tuk-tuk rides in Colombo to serene sunsets in Mirissa.",
    image: islandDiaries,
  },
  {
    title: "Top 10 Must-Visit Places in Sri Lanka",
    content:
      "Explore Sigiriya, Ella, and more. Your ultimate guide to Sri Lanka's must-see attractions.",
    image: topPlaces,
  },
  {
    title: "Flavors of Lanka: Culinary Adventures",
    content:
      "Embark on a culinary journey through Sri Lanka with iconic dishes like hoppers and Kottu.",
    image: culinaryAdventures,
  },
  {
    title: "Sri Lanka on a Budget: Travel Hacks",
    content:
      "Travel smart with our tips to explore Sri Lanka affordably, from budget stays to public transport.",
    image: budgetTravel,
  },
  {
    title: "Hidden Gems of Sri Lanka",
    content:
      "Uncover lesser-known treasures like Kalpitiya's dolphin tours and Sinharaja's rainforests.",
    image: hiddenGems,
  },
  {
    title: "Cultural Chronicles: Festivals of Sri Lanka",
    content:
      "Experience the vibrant festivals of Sri Lanka, like the iconic Esala Perahera in Kandy.",
    image: culturalChronicles,
  },
  {
    title: "Wild Sri Lanka: A Safari Lover's Guide",
    content:
      "Discover Sri Lanka's wildlife with safaris in Yala, Udawalawe, and beyond.",
    image: wildSriLanka,
  },
  {
    title: "Adventures Await: Thrills in Sri Lanka",
    content:
      "From rafting in Kitulgala to diving in Trincomalee, Sri Lanka is an adventurer's paradise.",
    image: adventures,
  },
  {
    title: "Traveler Tips: Everything You Need to Know",
    content:
      "Plan your trip like a pro with essential tips, including best seasons and local etiquette.",
    image: travelerTips,
  },
  {
    title: "Beach Bliss: Sri Lanka’s Coastal Escapes",
    content:
      "Relax on Sri Lanka’s finest beaches, from Mirissa to Trincomalee’s turquoise waters.",
    image: beachBliss,
  },
  {
    title: "Day Trips in Sri Lanka",
    content:
      "Short on time? Discover top day trips, like exploring Galle's historic charm.",
    image: dayTrips,
  },
  {
    title: "Eco-Lanka: Sustainable Travel",
    content:
      "Travel responsibly with our guide to Sri Lanka’s eco-lodges and sustainable practices.",
    image: ecoLanka,
  },
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleContentChange = (e) => setNewContent(e.target.value);
  const handleImageChange = (e) => setNewImage(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlogPost = {
      title: newTitle,
      content: newContent,
      image: newImage,
    };
    setBlogPosts([...blogPosts, newBlogPost]);
    setNewTitle("");
    setNewContent("");
    setNewImage(null);
  };

  return (
    <div >
      <section className="header-image">
                  <img src={galleryImage} alt="Gallery" className="top-banner" />
                  <div className="overlay-text">
                    <h1>Explore Sri Lanka</h1>
                    <p>Discover the beauty, culture, and adventures of Sri Lanka through our curated blog.</p>
                  </div>
                </section>

      <div className="blog-container">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-card">
            <img src={post.image} alt={post.title} className="blog-image" />
            <div className="blog-content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="add-blog-section">
        <h2>Share Your Travel Experience</h2>
        <form onSubmit={handleSubmit} className="add-blog-form">
          <div>
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              value={newContent}
              onChange={handleContentChange}
              required
            />
          </div>
          <div>
            <label>Upload Image</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
          <button type="submit">Add Blog</button>
        </form>
      </section>
    </div>
  );
};

export default Blog;