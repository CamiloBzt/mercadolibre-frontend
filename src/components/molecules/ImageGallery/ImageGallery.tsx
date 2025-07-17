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

  if (!images || images.length === 0) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThumbnailClick(index);
    }
  };

  return (
    <div className={`${styles.imagegallery} ${className}`}>
      <div className={styles.imagegallery__thumbnails}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.imagegallery__thumbnail} ${
              index === selectedImage
                ? styles.imagegallery__thumbnail__active
                : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`Ver imagen ${index + 1} de ${title}`}
            aria-pressed={index === selectedImage}
          >
            <Image
              src={image}
              alt={`${title} - Miniatura ${index + 1}`}
              width={48}
              height={48}
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>
      <div className={styles.imagegallery__main}>
        <Image
          src={images[selectedImage]}
          alt={`${title} - Imagen ${selectedImage + 1}`}
          width={428}
          height={566}
          priority
          style={{ objectFit: 'contain' }}
          className={styles.imagegallery__main_image}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
