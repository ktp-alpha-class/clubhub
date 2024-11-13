import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Profile.module.css';
import '@/app/globals.css';

const Profile: React.FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
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
    </Layout>
  );
};

export default Profile;