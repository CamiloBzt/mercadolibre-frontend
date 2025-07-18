import { ProductItem } from '@/store/api/types/product.types';

export interface ProductCardProps {
  product: ProductItem;
  onClick?: (productId: string) => void;
  priority?: boolean;
}
