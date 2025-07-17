import { Metadata } from 'next';
import { getProductById } from '@/lib/mockProductDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  return {
    title: `${product.title} | MercadoLibre`,
    description:
      product.description?.slice(0, 160) ||
      `Compra ${product.title} en MercadoLibre`,
    openGraph: {
      title: product.title,
      description:
        product.description?.slice(0, 160) ||
        `Compra ${product.title} en MercadoLibre`,
      images: [
        {
          url: product.pictures[0],
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description:
        product.description?.slice(0, 160) ||
        `Compra ${product.title} en MercadoLibre`,
      images: [product.pictures[0]],
    },
  };
}
