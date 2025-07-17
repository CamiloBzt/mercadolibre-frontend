import { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: 'Producto no encontrado | MercadoLibre',
      description: 'El producto que buscas no está disponible',
    };
  }

  const title = `${product.title} | MercadoLibre`;
  const description =
    product.description?.slice(0, 160) ||
    `Compra ${product.title} en MercadoLibre`;
  const price = Math.round(product.price * 4000);
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return {
    title,
    description: `${description} - ${formattedPrice}`,
    keywords: [
      'mercadolibre',
      'producto',
      'compras',
      'ecommerce',
      product.category,
      ...product.title.split(' ').slice(0, 5),
    ],
    openGraph: {
      title: product.title,
      description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
      type: 'website',
      siteName: 'MercadoLibre',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description,
      images: [product.image],
    },
    other: {
      'product:price:amount': price.toString(),
      'product:price:currency': 'COP',
      'product:availability': 'in stock',
      'product:condition': product.rating.rate > 4 ? 'new' : 'used',
      'product:category': product.category,
    },
  };
}
