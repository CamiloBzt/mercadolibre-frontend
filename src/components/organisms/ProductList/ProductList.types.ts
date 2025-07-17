import { Product } from '@/components/molecules/ProductCard/ProductCard.types';

export interface ProductListProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
  className?: string;
}
