import React, { useState } from "react";
import OwnPackage from "./OwnPackage";
import { Button, Typography, Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSuitcaseRolling, faEdit } from "@fortawesome/free-solid-svg-icons";
import "./OwnPackage.css";
import { useNavigate } from "react-router-dom";
import { alignProperty } from "@mui/material/styles/cssUtils";

export default function TourPackage() {
  const [customizeMode] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const handleCustomizeClick = () => {
    if (!userId) {
      alert("Please log in to view package details");
      return;
    }

    navigate(`/userpackage`);
  };

  return (
    <div className="tour-package-container">
      {!customizeMode ? (
        <>
          <Card className="tour-highlight-card">
            <CardContent>
              <div
                className="highlight-text"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "1rem",
                }}
              >
                <FontAwesomeIcon
                  icon={faSuitcaseRolling}
                  className="icon"
                  style={{ fontSize: "2rem", marginBottom: "1rem" }}
                />
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Discover exciting tours curated just for you!
                </Typography>
              </div>
              
            </CardContent>
          </Card>

          <div className="customize-option">
            <Typography variant="body1" className="customize-text">
              Don’t see a package you like? <br /> Customize your own tour!
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCustomizeClick}
              className="customize-button"
            >
              <FontAwesomeIcon icon={faEdit} className="button-icon" />
              Customize Your Package
            </Button>
          </div>
        </>
      ) : (
        <OwnPackage />
      )}
    </div>
  );
}
