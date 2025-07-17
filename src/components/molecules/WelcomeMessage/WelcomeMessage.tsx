'use client';

import Button from '@/components/atoms/Button/Button';
import React, { useEffect, useState } from 'react';
import styles from './WelcomeMessage.module.scss';

const WelcomeMessage: React.FC = () => {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  const onClose = () => {
    setShowWelcomeMessage(false);
  };

  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem('hasVisited');
      if (!hasVisited) {
        setShowWelcomeMessage(true);
        sessionStorage.setItem('hasVisited', 'true');
      }
    } catch {
      setShowWelcomeMessage(true);
    }
  }, []);
  return (
    showWelcomeMessage && (
      <div className={styles.welcomemessage}>
        <div className={styles.welcomemessage__content}>
          <h2 className={styles.welcomemessage__title}>Hola</h2>
          <p className={styles.welcomemessage__text}>
            Para realizar búsquedas, solo debes ingresar el nombre de lo que
            necesites. Pueden ser productos, marcas y más...
          </p>
          <Button
            type="button"
            variant="primary"
            onClick={onClose}
            className={styles.welcomemessage__close}
            aria-label="Cerrar mensaje de bienvenida"
          >
            ✕
          </Button>
        </div>
        <div className={styles.welcomemessage__arrow}></div>
      </div>
    )
  );
};

export default WelcomeMessage;
