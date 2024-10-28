import React from 'react';
import Sidebar from '../../components/Sidebar';
import Calendar from '../../components/Calendar';
import styles from '../../styles/Calendar.module.css';

const ClubCalendar: React.FC = () => {
  return (
    <div className="club-calendar">
      <Sidebar />
      <Calendar />
    </div>
  );
};

export default ClubCalendar;