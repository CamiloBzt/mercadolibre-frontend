export interface Product {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
    regular_amount?: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  installments?: string;
  seller?: string;
}

export interface ProductCardProps {
  product: Product;
  onClick?: (productId: string) => void;
}
