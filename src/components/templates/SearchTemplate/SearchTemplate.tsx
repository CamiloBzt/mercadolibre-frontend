import React from 'react';
import Header from '@/components/organisms/Header/Header';
import { SearchTemplateProps } from './SearchTemplate.types';
import styles from './SearchTemplate.module.scss';

const SearchTemplate: React.FC<SearchTemplateProps> = ({
  children,
  onSearch,
}) => {
  return (
    <div className={styles.searchtemplate}>
      <Header onSearch={onSearch} />
      <main className={styles.searchtemplate__main}>{children}</main>
    </div>
  );
};

export default SearchTemplate;
