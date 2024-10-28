import React from 'react';
import Sidebar from '../../components/Sidebar';
import Calendar from '../../components/Calendar';

const ClubCalendar: React.FC = () => {
  return (
    <div className="club-calendar">
      <Sidebar />
      <Calendar />
    </div>
  );
};

export default ClubCalendar;