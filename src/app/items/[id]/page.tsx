'use client';

import ProductDetail from '@/components/organisms/ProductDetail/ProductDetail';
import ProductDetailSkeleton from '@/components/organisms/ProductDetailSkeleton/ProductDetailSkeleton';
import DetailTemplate from '@/components/templates/DetailTemplate/DetailTemplate';
import { useGetProductByIdQuery } from '@/store/api/endpoints/products';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss';

interface ItemDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ItemDetailPage({ params }: ItemDetailPageProps) {
  const router = useRouter();
  const [productId, setProductId] = useState<string>('');

  const {
    data: productResponse,
    isLoading,
    error,
    isError,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set('search', query.trim());
      searchParams.set('page', '1');
      router.push(`/items?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  if (isLoading) {
    return (
      <DetailTemplate onSearch={handleSearch} categories={[]}>
        <ProductDetailSkeleton />
      </DetailTemplate>
    );
  }

  if (isError || !productResponse?.item) {
    return (
      <DetailTemplate onSearch={handleSearch} categories={[]}>
        <div className={styles.error}>
          <h2>Producto no encontrado</h2>
          <p>
            {error && 'status' in error && error.status === 404
              ? 'El producto que buscas no existe.'
              : 'Ocurrió un error al cargar el producto. Por favor, intenta nuevamente.'}
          </p>
        </div>
      </DetailTemplate>
    );
  }

  const product = productResponse.item;

  return (
    <DetailTemplate
      onSearch={handleSearch}
      categories={product.category_path_from_root}
      publicationNumber={product.publication_number}
    >
      <ProductDetail product={product} />
    </DetailTemplate>
  );
}
