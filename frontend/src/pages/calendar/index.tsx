import React from 'react';
import Sidebar from '../../components/Sidebar';
import Calendar from '../../components/Calendar';
import '../../app/globals.css';

const ClubCalendar: React.FC = () => {
  return (
    <div className="club-calendar">
      <Sidebar />
      <Calendar />
    </div>
  );
};

export default ClubCalendar;