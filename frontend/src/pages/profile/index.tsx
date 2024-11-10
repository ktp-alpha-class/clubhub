import React from 'react';
import Sidebar from '../../components/Sidebar';
import styles from '../../styles/Profile.module.css';
import '@/app/globals.css';

const Profile: React.FC = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.header}>Profile</h1>
        <div className={styles.profileDetails}>
          <img src="/images/ktp.jpg" alt="Profile Picture" className={styles.profilePic} />
          <div className={styles.info}>
            <h2>John Doe</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;