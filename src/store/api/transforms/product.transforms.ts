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
  installments: `Mismo precio en 6 cuotas de $ ${Math.round((product.price * 4000) / 6).toLocaleString('es-CO')}`,
  seller: 'FAKESTORE SELLER',
  category: product.category,
});

export const transformProductDetail = (
  product: FakeStoreProduct
): ProductDetailItem => {
  const generateImages = (baseImage: string) => {
    const transformations = [
      '',
      '?transform=rotate-15',
      '?transform=scale-110',
      '?transform=flip-horizontal',
      '?transform=brightness-110',
      '?transform=contrast-120',
    ];

    const numImages = Math.floor(Math.random() * 4) + 2;
    const selectedTransformations = transformations.slice(0, numImages);

    return selectedTransformations.map(
      (transform) => `${baseImage}${transform}`
    );
  };

  const generateAttributes = (product: FakeStoreProduct) => {
    const baseAttributes = [
      {
        id: 'CATEGORY',
        name: 'Categoría',
        value_name: product.category,
      },
      {
        id: 'RATING',
        name: 'Calificación',
        value_name: `${product.rating.rate}/5 (${product.rating.count} reviews)`,
      },
    ];

    const categorySpecificAttributes = [];

    if (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    ) {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const materials = [
        'Algodón 100%',
        'Poliéster',
        'Mezcla de algodón',
        'Lino',
        'Denim',
      ];
      const colors = ['Negro', 'Blanco', 'Azul', 'Gris', 'Rojo', 'Verde'];

      categorySpecificAttributes.push(
        {
          id: 'MATERIAL',
          name: 'Material',
          value_name: materials[Math.floor(Math.random() * materials.length)],
        },
        {
          id: 'SIZE',
          name: 'Talla',
          value_name: sizes[Math.floor(Math.random() * sizes.length)],
        },
        {
          id: 'COLOR',
          name: 'Color',
          value_name: colors[Math.floor(Math.random() * colors.length)],
        }
      );
    } else if (product.category === 'electronics') {
      const brands = ['Samsung', 'LG', 'Sony', 'Panasonic', 'Philips'];
      const warranties = ['6 meses', '12 meses', '24 meses', '36 meses'];

      categorySpecificAttributes.push(
        {
          id: 'BRAND',
          name: 'Marca',
          value_name: brands[Math.floor(Math.random() * brands.length)],
        },
        {
          id: 'WARRANTY',
          name: 'Garantía',
          value_name: warranties[Math.floor(Math.random() * warranties.length)],
        },
        {
          id: 'POWER',
          name: 'Alimentación',
          value_name: '110V - 220V',
        }
      );
    } else if (product.category === 'jewelery') {
      const materials = [
        'Acero inoxidable',
        'Plata 925',
        'Oro laminado',
        'Aleación',
      ];
      const origins = ['Importado', 'Nacional', 'Hecho a mano'];

      categorySpecificAttributes.push(
        {
          id: 'MATERIAL',
          name: 'Material',
          value_name: materials[Math.floor(Math.random() * materials.length)],
        },
        {
          id: 'ORIGIN',
          name: 'Origen',
          value_name: origins[Math.floor(Math.random() * origins.length)],
        },
        {
          id: 'WEIGHT',
          name: 'Peso',
          value_name: `${(Math.random() * 50 + 5).toFixed(1)}g`,
        }
      );
    }

    return [...baseAttributes, ...categorySpecificAttributes];
  };

  const getCategoryPath = (category: string) => {
    const categoryMappings: { [key: string]: string[] } = {
      "men's clothing": ['Ropa, Bolsas y Calzado', 'Ropa', 'Hombre'],
      "women's clothing": ['Ropa, Bolsas y Calzado', 'Ropa', 'Mujer'],
      electronics: ['Electrónicos, Audio y Video', 'Electrónicos'],
      jewelery: ['Joyas y Relojes', 'Joyas'],
    };

    return categoryMappings[category] || [category];
  };

  const generatePublicationNumber = (productId: string) => {
    const baseNumber = 1000000000;
    const productIdNum = parseInt(productId) || 1;
    return baseNumber + productIdNum * 12345 + Math.floor(productIdNum * 6789);
  };

  return {
    id: product.id.toString(),
    title: product.title,
    price: {
      currency: 'COP',
      amount: Math.round(product.price * 4000),
      decimals: 0,
      regular_amount:
        product.rating.rate < 4 ? Math.round(product.price * 4200) : undefined,
    },
    pictures: generateImages(product.image),
    condition:
      product.rating.rate > 4
        ? 'new'
        : product.rating.rate > 3
          ? 'used'
          : 'refurbished',
    free_shipping: product.price > 10,
    sold_quantity: Math.max(
      product.rating.count,
      Math.floor(Math.random() * 500) + 1
    ),
    installments: `Mismo precio en 6 cuotas de $ ${Math.round((product.price * 4000) / 6).toLocaleString('es-CO')}`,
    description: product.description,
    attributes: generateAttributes(product),
    category_path_from_root: getCategoryPath(product.category),
    seller: 'FAKESTORE SELLER',
    publication_number: generatePublicationNumber(product.id.toString()),
  };
};
