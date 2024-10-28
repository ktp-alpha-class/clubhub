// src/components/EventCard.tsx
import React from 'react';

interface EventCardProps {
  eventName: string;
  time: string;
  location: string;
}

const EventCard: React.FC<EventCardProps> = ({ eventName, time, location }) => {
  return (
    <div className="event-card">
      <div className="event-info">
        <p>{eventName}</p>
        <p>{time}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

export default EventCard;