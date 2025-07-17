import { Product } from '@/components/molecules/ProductCard/ProductCard.types';

const baseProducts: Product[] = [
  {
    id: 'MLA1362836001',
    title: 'Apple iPhone 13 (128 GB) - Blanco estelar',
    price: {
      currency: 'ARS',
      amount: 1362836,
      decimals: 0,
    },
    picture:
      'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829758_052021-F.webp',
    condition: 'nuevo',
    free_shipping: true,
    installments: 'Mismo precio en 9 cuotas de $ 151.426',
    seller: 'OCEANGREEN ARGENTINA',
  },
  {
    id: 'MLA1099995001',
    title: 'Apple iPhone 11 (128 GB) - Negro',
    price: {
      currency: 'ARS',
      amount: 1099995,
      decimals: 0,
    },
    picture:
      'https://http2.mlstatic.com/D_NQ_NP_2X_727471-MLA46114990464_052021-F.webp',
    condition: 'nuevo',
    free_shipping: true,
    installments: 'Mismo precio en 9 cuotas de $ 122.222',
    seller: 'OCEANGREEN ARGENTINA',
  },
  {
    id: 'MLA545190001',
    title: 'Apple iPhone XR 6.1 12 Max 64gb Negro Reacondicionado',
    price: {
      currency: 'ARS',
      amount: 545190,
      decimals: 0,
      regular_amount: 579999,
    },
    picture:
      'https://http2.mlstatic.com/D_NQ_NP_2X_601471-MLA44757170735_012021-F.webp',
    condition: 'reacondicionado',
    free_shipping: true,
    installments: 'Mismo precio en 6 cuotas de $ 90.865',
    seller: 'SKY VISION',
  },
  {
    id: 'MLA545190002',
    title: 'Apple iPhone XR 6.1 12 Max 64gb Negro Reacondicionado',
    price: {
      currency: 'ARS',
      amount: 545190,
      decimals: 0,
      regular_amount: 579999,
    },
    picture:
      'https://http2.mlstatic.com/D_NQ_NP_2X_601471-MLA44757170735_012021-F.webp',
    condition: 'reacondicionado',
    free_shipping: true,
    installments: 'Mismo precio en 6 cuotas de $ 90.865',
    seller: 'SKY VISION',
  },
];

export const mockProducts: Product[] = Array.from({ length: 100 }, (_, i) => {
  const base = baseProducts[i % baseProducts.length];
  return {
    ...base,
    id: `${base.id}_${i + 1}`,
  };
});

// Función para simular paginación
export const getPaginatedProducts = (
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = mockProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(mockProducts.length / itemsPerPage),
    totalItems: mockProducts.length,
    itemsPerPage,
  };
};

// Función para simular búsqueda
export const searchProducts = (
  query: string,
  page: number = 1,
  itemsPerPage: number = 10
) => {
  const filteredProducts = mockProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.seller?.toLowerCase().includes(query.toLowerCase())
  );

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    currentPage: page,
    totalPages: Math.ceil(filteredProducts.length / itemsPerPage),
    totalItems: filteredProducts.length,
    itemsPerPage,
    query,
  };
};
