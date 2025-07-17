export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface FakeStoreCategory {
  id: number;
  name: string;
  image: string;
}

export interface ProductItem {
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
  category: string;
}

export interface SearchProductsResponse {
  categories: string[];
  items: ProductItem[];
  pagination: {
    total: number;
    offset: number;
    limit: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}

export interface ProductDetailItem {
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
  description: string;
  attributes: Array<{
    id: string;
    name: string;
    value_name: string;
  }>;
  category_path_from_root: string[];
  seller?: string;
}

export interface ProductDetailResponse {
  item: ProductDetailItem;
}
