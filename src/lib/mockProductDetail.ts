import { ProductDetailItem } from '@/store/api/types/product.types';

export const mockProductDetail: ProductDetailItem = {
  id: 'MLA1362836001',
  title: 'Apple iPhone 14 (128 GB) - Blanco estelar',
  price: {
    currency: 'ARS',
    amount: 545190,
    decimals: 0,
    regular_amount: 579999,
  },
  pictures: [
    'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829758_052021-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829759_052021-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829760_052021-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829761_052021-F.webp',
    'https://http2.mlstatic.com/D_NQ_NP_2X_899441-MLA46114829762_052021-F.webp',
  ],
  condition: 'new',
  free_shipping: true,
  sold_quantity: 100,
  installments: 'Mismo precio en 9 cuotas de $ 151.426',
  description: `El iPhone SE es el iPhone de 4,7 pulgadas más potente hasta ahora (1). Tiene el chip A13 Bionic, que ofrece un rendimiento increíble en apps, juegos y fotos. Viene con modo Retrato y seis efectos de iluminación para tomar retratos con calidad de estudio, HDR Inteligente de última generación que ofrece un nivel de detalle sorprendente en las luces y las sombras de las fotos, video 4K de calidad cinematográfica y todas las funcionalidades avanzadas de iOS.

Además de una batería de larga duración (2) y resistencia al agua (3). Tiene todo lo que te gusta del iPhone en un diseño compacto que te encantará.

Avisos Legales:
(1) El tamaño de la pantalla se mide en diagonal.
(2) La duración de la batería varía según el uso y la configuración.
(3) El iPhone SE es resistente a las salpicaduras, al agua y al polvo, y fue probado en condiciones de laboratorio controladas; el iPhone SE tiene una clasificación IP67 según la norma IEC 60529 (hasta 30 minutos a una profundidad máxima de 1 metro). La resistencia a las salpicaduras, al agua y al polvo no es una condición permanente, y podría disminuir como consecuencia del uso normal.`,
  attributes: [
    {
      id: 'BRAND',
      name: 'Marca',
      value_name: 'Apple',
    },
    {
      id: 'MODEL',
      name: 'Modelo',
      value_name: 'iPhone 14',
    },
    {
      id: 'INTERNAL_MEMORY',
      name: 'Memoria interna',
      value_name: '128 GB',
    },
    {
      id: 'MAIN_COLOR',
      name: 'Color',
      value_name: 'Blanco estelar',
    },
    {
      id: 'RAM',
      name: 'Memoria RAM',
      value_name: '6 GB',
    },
  ],
  category_path_from_root: [
    'Celulares y Teléfonos',
    'Celulares y Smartphones',
    'Apple iPhone',
  ],
  seller: 'SKY VISION',
};

export const getProductById = (id: string): ProductDetailItem => {
  return {
    ...mockProductDetail,
    id,
  };
};
