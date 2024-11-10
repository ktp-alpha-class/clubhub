import React from 'react';
import Sidebar from '../../components/Sidebar';
import Dashboard from '../../components/Dashboard';
import styles from '../../styles/Explore.module.css';
import '@/app/globals.css';

const ExplorePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>Explore Clubs</h1>
        <Dashboard />
      </div>
    </div>
  );
};

export default ExplorePage;