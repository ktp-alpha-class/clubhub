import React from 'react';
import Layout from '../../components/Layout';
import Dashboard from '../../components/Dashboard';
import styles from '../../styles/Explore.module.css';
import '@/app/globals.css';

const ExplorePage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h1>Explore Clubs</h1>
          <Dashboard />
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;