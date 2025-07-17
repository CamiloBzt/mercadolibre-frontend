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

export const transformProductsWithPagination = (
  products: FakeStoreProduct[],
  query: string,
  offset: number = 0,
  limit: number = 10
) => {
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
  );

  const startIndex = offset;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const categories = Array.from(
    new Set(filteredProducts.map((p) => p.category))
  );

  return {
    categories,
    items: paginatedProducts.map(transformProduct),
    pagination: {
      total: filteredProducts.length,
      offset,
      limit,
      has_next_page: endIndex < filteredProducts.length,
      has_previous_page: offset > 0,
    },
  };
};
