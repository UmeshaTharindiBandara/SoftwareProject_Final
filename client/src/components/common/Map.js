import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 6.0356, 
  lng: 80.2200, 
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY"> {/* Replace with your Google Maps API Key */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
