import { ProductItem } from '@/store/api/types/product.types';

export interface SearchResultsProps {
  products: ProductItem[];
  isLoading?: boolean;
  onProductClick?: (productId: string) => void;
  className?: string;
}
