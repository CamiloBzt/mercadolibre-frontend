import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb';
import Header from '@/components/organisms/Header/Header';
import React from 'react';
import styles from './DetailTemplate.module.scss';
import { DetailTemplateProps } from './DetailTemplate.types';

const DetailTemplate: React.FC<DetailTemplateProps> = ({
  children,
  categories = [],
  publicationNumber,
  onSearch,
}) => {
  return (
    <div className={styles.detailtemplate}>
      <Header onSearch={onSearch} />
      <div className={styles.detailtemplate__container}>
        {categories.length ? (
          <div className={styles.detailtemplate__top}>
            <Breadcrumb categories={categories} />
            {publicationNumber && (
              <p className={styles.detailtemplate__top_publication}>
                Publicación:{' '}
                <span className={styles.detailtemplate__top_publication_number}>
                  #{publicationNumber}
                </span>
              </p>
            )}
          </div>
        ) : null}
        <main className={styles.detailtemplate__main}>{children}</main>
      </div>
    </div>
  );
};

export default DetailTemplate;
