"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import "./globals.css";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/explore');
  }, [router]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <h1>Welcome to ClubHub</h1>
          <button onClick={() => router.push('/explore')}>Explore Clubs</button>
        </div>
      </div>
    </div>
  );
}