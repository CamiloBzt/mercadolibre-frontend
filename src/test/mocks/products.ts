import { ProductItem } from '@/store/api/types/product.types';

export const mockProduct: ProductItem = {
  id: '1',
  title: 'iPhone 13 Pro Max',
  price: {
    currency: 'COP',
    amount: 1200000,
    decimals: 0,
    regular_amount: 1400000,
  },
  picture: 'https://via.placeholder.com/300',
  condition: 'nuevo',
  free_shipping: true,
  installments: 'Mismo precio en 6 cuotas de $ 200.000',
  seller: 'FAKESTORE SELLER',
  category: 'electronics',
};

export const mockProducts: ProductItem[] = [
  mockProduct,
  {
    ...mockProduct,
    id: '2',
    title: 'Samsung Galaxy S22',
    price: { ...mockProduct.price, amount: 900000, regular_amount: undefined },
  },
  {
    ...mockProduct,
    id: '3',
    title: 'MacBook Air',
    category: 'electronics',
    condition: 'usado',
    free_shipping: false,
  },
];
