'use client';

import WelcomeMessage from '@/components/molecules/WelcomeMessage/WelcomeMessage';
import Header from '@/components/organisms/Header/Header';
import React, { useEffect, useState } from 'react';
import styles from './HomeTemplate.module.scss';
import { HomeTemplateProps } from './HomeTemplate.types';

const HomeTemplate: React.FC<HomeTemplateProps> = ({ children }) => {
  const handleSearch = (query: string) => {
    // TODO: Implementar lógica de búsqueda
    console.log('Búsqueda:', query);
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
