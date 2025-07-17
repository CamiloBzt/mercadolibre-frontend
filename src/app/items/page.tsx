'use client';

import Pagination from '@/components/molecules/Pagination/Pagination';
import SearchResults from '@/components/organisms/SearchResults/SearchResults';
import SearchResultsSkeleton from '@/components/organisms/SearchResultsSkeleton/SearchResultsSkeleton';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { useSearch } from '@/hooks/useSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import styles from './page.module.scss';

function ItemsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    products,
    query,
    currentPage,
    totalPages,
    isLoading,
    handleSearch,
    handlePageChange,
    hasData,
  } = useSearch();

  const urlQuery = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');

  const handleHeaderSearch = (newQuery: string) => {
    const params = new URLSearchParams();
    params.set('search', newQuery);
    params.set('page', '1');
    router.push(`/items?${params.toString()}`);
  };

  const handlePaginationChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('search', query);
    params.set('page', page.toString());
    router.push(`/items?${params.toString()}`);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/items/${productId}`);
  };

  useEffect(() => {
    const urlPage = pageParam ? parseInt(pageParam, 10) : 1;

    if (urlQuery !== query) {
      handleSearch(urlQuery);
    }

    if (urlPage !== currentPage && urlPage > 0) {
      handlePageChange(urlPage);
    }
  }, [urlQuery, pageParam, query, currentPage, handleSearch, handlePageChange]);

  return (
    <SearchTemplate onSearch={handleHeaderSearch}>
      {query ? (
        <>
          <SearchResults
            products={products}
            isLoading={isLoading}
            onProductClick={handleProductClick}
          />
          {!isLoading && hasData && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePaginationChange}
            />
          )}
        </>
      ) : (
        <div className={styles.emptySearch}>
          <p>Ingresa un término de búsqueda para ver resultados</p>
        </div>
      )}
    </SearchTemplate>
  );
}

export default function ItemsPage() {
  return (
    <Suspense fallback={<SearchResultsSkeleton itemCount={10} />}>
      <ItemsPageContent />
    </Suspense>
  );
}
