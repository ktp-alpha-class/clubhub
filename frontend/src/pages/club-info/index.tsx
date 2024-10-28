import React from 'react';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/ClubInfo.module.css';

const ClubInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.header}>Club Information</h1>
        <div className={styles.clubDetails}>
          <img src="/images/ktp.jpg" alt="Club Logo" className={styles.clubLogo} />
          <div className={styles.info}>
            <h2>Chess Club</h2>
            <p>Description</p>
            <p>Meeting Time</p>
            <p>Location</p>
            <p>Contact: john@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubInfo;