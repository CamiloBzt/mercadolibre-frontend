import { BLUR_DATA_URL, FALLBACK_IMAGE } from '@/constants/images';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './ImageGallery.module.scss';
import { ImageGalleryProps } from './ImageGallery.types';

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  title,
  className = '',
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  if (!images || images.length === 0) {
    return null;
  }

  const validImages = images.filter((_, index) => !imageErrors.has(index));
  const displayImages = validImages.length > 0 ? validImages : [images[0]];

  const adjustedSelectedImage = imageErrors.has(selectedImage)
    ? 0
    : Math.min(selectedImage, displayImages.length - 1);

  const handleThumbnailClick = (index: number) => {
    if (!imageErrors.has(index)) {
      setSelectedImage(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThumbnailClick(index);
    }
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));

    if (index === selectedImage) {
      const nextValidIndex = images.findIndex(
        (_, i) => !imageErrors.has(i) && i !== index
      );
      if (nextValidIndex !== -1) {
        setSelectedImage(nextValidIndex);
      }
    }
  };

  return (
    <div className={`${styles.imagegallery} ${className}`}>
      <div className={styles.imagegallery__thumbnails}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.imagegallery__thumbnail} ${
              index === adjustedSelectedImage && !imageErrors.has(index)
                ? styles.imagegallery__thumbnail__active
                : ''
            } ${imageErrors.has(index) ? 'opacity-50' : ''}`}
            onClick={() => handleThumbnailClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`Ver imagen ${index + 1} de ${title}`}
            aria-pressed={
              index === adjustedSelectedImage && !imageErrors.has(index)
            }
            disabled={imageErrors.has(index)}
          >
            <Image
              src={imageErrors.has(index) ? FALLBACK_IMAGE : image}
              alt={`${title} - Miniatura ${index + 1}`}
              width={48}
              height={48}
              style={{ objectFit: 'contain' }}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              onError={() => handleImageError(index)}
            />
          </button>
        ))}
      </div>
      <div className={styles.imagegallery__main}>
        <Image
          src={
            imageErrors.has(adjustedSelectedImage)
              ? FALLBACK_IMAGE
              : images[adjustedSelectedImage]
          }
          alt={`${title} - Imagen ${adjustedSelectedImage + 1}`}
          width={428}
          height={566}
          priority
          style={{ objectFit: 'contain' }}
          className={styles.imagegallery__main_image}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onError={() => handleImageError(adjustedSelectedImage)}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
