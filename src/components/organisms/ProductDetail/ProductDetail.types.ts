export interface ProductDetailData {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
    regular_amount?: number;
  };
  pictures: string[];
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  installments?: string;
  description?: string;
  attributes: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
  category_path_from_root: string[];
  seller?: string;
}

export interface ProductDetailProps {
  product: ProductDetailData;
  className?: string;
}
