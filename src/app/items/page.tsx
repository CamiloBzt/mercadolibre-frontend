'use client';

import Pagination from '@/components/molecules/Pagination/Pagination';
import { Product } from '@/components/molecules/ProductCard/ProductCard.types';
import SearchResults from '@/components/organisms/SearchResults/SearchResults';
import SearchResultsSkeleton from '@/components/organisms/SearchResultsSkeleton/SearchResultsSkeleton';
import SearchTemplate from '@/components/templates/SearchTemplate/SearchTemplate';
import { searchProducts } from '@/lib/mockData';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import styles from './page.module.scss';

function ItemsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get('search') || '';
  const pageParam = searchParams.get('page');

  // Función para realizar búsqueda
  const performSearch = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);

    // Simular delay de API
    setTimeout(() => {
      const results = searchProducts(searchQuery, page, 10);

      setProducts(results.products);
      setCurrentPage(results.currentPage);
      setTotalPages(results.totalPages);
      setIsLoading(false);
    }, 800);
  };

  // Manejar búsqueda desde el header
  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams();
    params.set('search', newQuery);
    params.set('page', '1');
    router.push(`/items?${params.toString()}`);
  };

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.set('search', query);
    params.set('page', page.toString());
    router.push(`/items?${params.toString()}`);
  };

  // Manejar click en producto
  const handleProductClick = (productId: string) => {
    router.push(`/items/${productId}`);
  };

  // Efecto para cargar resultados cuando cambian los parámetros
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam, 10) : 1;

    if (query) {
      performSearch(query, page);
    }
  }, [query, pageParam]);

  return (
    <SearchTemplate onSearch={handleSearch}>
      {query ? (
        <SearchResults
          products={products}
          isLoading={isLoading}
          onProductClick={handleProductClick}
        />
      ) : (
        <div className={styles.emptySearch}>
          <p>Ingresa un término de búsqueda para ver resultados</p>
        </div>
      )}
      {!isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
