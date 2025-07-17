'use client';

import ProductDetail from '@/components/organisms/ProductDetail/ProductDetail';
import { ProductDetailData } from '@/components/organisms/ProductDetail/ProductDetail.types';
import ProductDetailSkeleton from '@/components/organisms/ProductDetailSkeleton/ProductDetailSkeleton';
import DetailTemplate from '@/components/templates/DetailTemplate/DetailTemplate';
import { getProductById } from '@/lib/mockProductDetail';
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
  const [product, setProduct] = useState<ProductDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productId, setProductId] = useState<string>('');

  useEffect(() => {
    // Unwrap params promise
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!productId) return;

    // Simular carga de datos
    setIsLoading(true);

    // Simulamos un delay de API
    setTimeout(() => {
      const productData = getProductById(productId);
      setProduct(productData);
      setIsLoading(false);
    }, 1000);
  }, [productId]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set('search', query.trim());
      searchParams.set('page', '1');
      router.push(`/items?${searchParams.toString()}`);
    }
  };

  if (isLoading) {
    return (
      <DetailTemplate onSearch={handleSearch} categories={[]}>
        <ProductDetailSkeleton />
      </DetailTemplate>
    );
  }

  if (!product) {
    return (
      <DetailTemplate onSearch={handleSearch} categories={[]}>
        <div className={styles.error}>
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o fue eliminado.</p>
        </div>
      </DetailTemplate>
    );
  }

  return (
    <DetailTemplate
      onSearch={handleSearch}
      categories={product.category_path_from_root}
    >
      <ProductDetail product={product} />
    </DetailTemplate>
  );
}
