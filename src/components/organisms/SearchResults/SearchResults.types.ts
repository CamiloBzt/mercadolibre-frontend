import { Product } from '@/components/molecules/ProductCard/ProductCard.types';

export interface SearchResultsProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (productId: string) => void;
  className?: string;
}
