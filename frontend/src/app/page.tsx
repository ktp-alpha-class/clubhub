"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/Home.module.css';
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
        {/* The main content will be redirected to /explore */}
      </div>
    </div>
  );
}