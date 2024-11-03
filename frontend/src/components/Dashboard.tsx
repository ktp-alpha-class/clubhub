import React from 'react';
import Grid from '@mui/material/Grid';
import ClubCard from './ClubCard';
import { clubs } from '../app/shared/clubs';

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