import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const CustomizedPackageDetails = ({ selectedOptions, tour }) => {
  return (
    <div className="customized-package-details-container">
      <Typography variant="h4" gutterBottom>
        Customized Package Details: {tour.name}
      </Typography>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Meal Plan</Typography>
          <Divider />
          <Typography>{selectedOptions.mealPlan || 'No meal plan selected'}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Activity Add-Ons</Typography>
          <Divider />
          {selectedOptions.activities.length > 0 ? (
            selectedOptions.activities.map((activity, index) => (
              <Typography key={index}>{activity}</Typography>
            ))
          ) : (
            <Typography>No activities selected</Typography>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Optional Destinations</Typography>
          <Divider />
          {selectedOptions.destinations.length > 0 ? (
            selectedOptions.destinations.map((destination, index) => (
              <Typography key={index}>{destination}</Typography>
            ))
          ) : (
            <Typography>No destinations selected</Typography>
          )}
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Transport Mode</Typography>
          <Divider />
          <Typography>{selectedOptions.transport || 'No transport selected'}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Hotel Selection</Typography>
          <Divider />
          <Typography>{selectedOptions.hotels || 'No hotel selected'}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Guide Selection</Typography>
          <Divider />
          <Typography>{selectedOptions.guides || 'No guide selected'}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="customization-card">
        <CardContent>
          <Typography variant="h6">Special Requests</Typography>
          <Divider />
          <Typography>{selectedOptions.specialRequests || 'No special requests'}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizedPackageDetails;