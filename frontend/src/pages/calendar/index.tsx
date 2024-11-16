import React from 'react';
import Layout from '../../components/Layout';
import Calendar from '../../components/Calendar';
import '../../app/globals.css';

const ClubCalendar: React.FC = () => {
  return (
    <Layout>
      <Calendar />
    </Layout>
  );
};

export default ClubCalendar;