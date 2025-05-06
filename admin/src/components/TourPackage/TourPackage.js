import React from 'react'
import TourList from './TourList'
import OwnPackage from './OwnPackage'
import galleryImage from "../../assets/images/hero_image.jpg";

export default function TourPackage() {
  return (
    <>

    <section className="header-image">
      <img src={galleryImage} alt="Gallery" className="top-banner" />
        <div className="overlay-text">
        <h1>Choose your dream tours join us</h1>
        <p>We’re provide our tour packages more resonables prices!</p>
        </div>
    </section>


    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {/* Tour list on the left */}
      <div style={{ flex: '2' }}>
        <TourList />
      </div>

      {/* Customize package card on the right */}
      <div style={{ flex: '1', marginLeft: '20px',  marginTop: '20px', padding: '20px' }}>
        <OwnPackage />
      </div>
    </div>
    </>
  )
}
