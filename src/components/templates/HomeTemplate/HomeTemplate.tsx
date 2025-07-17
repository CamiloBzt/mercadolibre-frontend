'use client';

import WelcomeMessage from '@/components/molecules/WelcomeMessage/WelcomeMessage';
import Header from '@/components/organisms/Header/Header';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './HomeTemplate.module.scss';
import { HomeTemplateProps } from './HomeTemplate.types';

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const params = new URLSearchParams();
      params.set('search', query.trim());
      params.set('page', '1');
      router.push(`/items?${params.toString()}`);
    }
  };

  return (
    <div className={styles.hometemplate}>
      <Header onSearch={handleSearch} />
      <main className={styles.hometemplate__main}>
        <WelcomeMessage />
        {children}
      </main>
    </div>
  );
};

export default HomeTemplate;
