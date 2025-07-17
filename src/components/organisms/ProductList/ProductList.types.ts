import { ProductItem } from '@/store/api/types/product.types';

export interface ProductListProps {
  products: ProductItem[];
  onProductClick?: (productId: string) => void;
  className?: string;
}
