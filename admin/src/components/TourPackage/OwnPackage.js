import React, { useState } from 'react';
import OwnPackage from './OwnPackage';
import { Button, Typography, Card, CardContent } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcaseRolling, faEdit } from '@fortawesome/free-solid-svg-icons';
import './OwnPackage.css';
import { useNavigate } from 'react-router-dom';


export default function TourPackage() {
  const [customizeMode] = useState(false);
  const navigate = useNavigate();

  const handleCustomizeClick = () => {
    navigate(`/userpackage`);
  };

  return (
    <div className="tour-package-container">
      {!customizeMode ? (
        <>
          <Card className="tour-highlight-card">
            <CardContent>
              <div className="highlight-text">
                <FontAwesomeIcon icon={faSuitcaseRolling} className="icon" />
                <Typography variant="h4" gutterBottom>
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
