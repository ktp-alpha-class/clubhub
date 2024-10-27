// src/components/Dashboard.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import ClubCard from './ClubCard';

const clubs = [
  {
    name: 'Kappa Theta Pi',
    description: 'First Professional Co-ed Tech Fraternity',
    image: 'images/ktp.jpg',
  },
  {
    name: 'Husky Ambassadors',
    description: 'Tour Guides for the University',
    image: 'images/huskyAmbassadors.jpg',
  },
  {
    name: 'Student Alumni Ambassadors',
    description: 'Group of undergraduate students, representing the Office of Alumni Relations',
    image: 'images/saa.jpg',
  },
  // Add more clubs as needed
];

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {clubs.map((club, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ClubCard
            name={club.name}
            description={club.description}
            image={club.image}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dashboard;