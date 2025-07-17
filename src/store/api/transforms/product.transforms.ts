import {
  FakeStoreProduct,
  ProductItem,
  ProductDetailItem,
} from '../types/product.types';

export const transformProduct = (product: FakeStoreProduct): ProductItem => ({
  id: product.id.toString(),
  title: product.title,
  price: {
    currency: 'COP',
    amount: Math.round(product.price * 4000),
    decimals: 0,
    regular_amount:
      product.rating.rate < 4 ? Math.round(product.price * 4200) : undefined,
  },
  picture: product.image,
  condition: product.rating.rate > 4 ? 'nuevo' : 'usado',
  free_shipping: product.price > 10,
  installments: `Mismo precio en 6 cuotas de $ ${Math.round((product.price * 4000) / 6)}`,
  seller: 'FAKESTORE SELLER',
  category: product.category,
});

export const transformProductDetail = (
  product: FakeStoreProduct
): ProductDetailItem => ({
  id: product.id.toString(),
  title: product.title,
  price: {
    currency: 'COP',
    amount: Math.round(product.price * 4000),
    decimals: 0,
    regular_amount:
      product.rating.rate < 4 ? Math.round(product.price * 4200) : undefined,
  },
  pictures: [product.image, product.image, product.image],
  condition: product.rating.rate > 4 ? 'new' : 'used',
  free_shipping: product.price > 10,
  sold_quantity: product.rating.count,
  installments: `Mismo precio en 6 cuotas de $ ${Math.round((product.price * 4000) / 6)}`,
  description: product.description,
  attributes: [
    {
      id: 'CATEGORY',
      name: 'Categoría',
      value_name: product.category,
    },
    {
      id: 'RATING',
      name: 'Calificación',
      value_name: `${product.rating.rate}/5`,
    },
  ],
  category_path_from_root: [product.category],
  seller: 'FAKESTORE SELLER',
});
