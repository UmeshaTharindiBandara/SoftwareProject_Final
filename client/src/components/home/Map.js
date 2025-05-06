// src/components/SriLankaMap.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

// Fix icon issue in Leaflet with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const locations = [
  { name: "Colombo", position: [6.9271, 79.8612] },
  { name: "Kandy", position: [7.2906, 80.6337] },
  { name: "Galle", position: [6.0535, 80.2210] },
  { name: "Sigiriya", position: [7.9570, 80.7603] },
  { name: "Nuwara Eliya", position: [6.9497, 80.7891] },
];

const SriLankaMap = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const navigate = useNavigate();
  const handleAddToTour = () => {
    // Navigate to the tour page with query parameter
    navigate(`/signup`);
  };

  return (
    <div className="contact-grid">
    <div style={{ height: "500px", width: "150%", marginTop: "10rem", marginBottom: "2rem" }}>
      

      <MapContainer center={[7.8731, 80.7718]} zoom={7} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            <Popup>
              <strong>{loc.name}</strong> <br />
              <button
                onClick={handleAddToTour}
                className="bg-blue-500 text-white px-1 py-1 mt-1 rounded"
              >
                ➕ View Tour Package
              </button>
            </Popup>
            <Tooltip>{loc.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

      
    </div>
    </div>
  );
};

export default SriLankaMap;
