import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface ClubCardProps {
  name: string;
  description: string;
  image: string;
  badges: string[];
}

const ClubCard: React.FC<ClubCardProps> = ({ name, description, image, badges }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // Add backend integration for persistent follow status here if needed
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', marginY: 1 }}>
            {badges.map((badge, index) => (
              <Label key={index} className="bg-primary text-primary-foreground p-1 rounded">
                {badge}
              </Label>
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Button
            onClick={handleFollowClick}
            className="mt-2"
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClubCard;
