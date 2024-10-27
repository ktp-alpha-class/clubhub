import React from 'react';
import styles from '../styles/Calendar.module.css';

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

interface Event {
  eventName: string;
  time: string;
  location: string;
}

const events: Event[] = [
  { eventName: 'Event name', time: 'Time', location: 'Location' },
];

const Calendar: React.FC = () => {
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <h1>My Calendar</h1>
        <button>Calendar One</button>
        <button>Calendar Two</button>
        <div className={styles.viewToggle}>
          <button>Day</button>
          <button className={styles.active}>Week</button>
          <button>Month</button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;