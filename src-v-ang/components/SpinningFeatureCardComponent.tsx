// src/components/SpinningFeatureCardComponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './SpinningFeatureCard.module.css';

interface SpinningDoorCardProps {
  title: string;
  description: string;
}

const SpinningDoorCard: React.FC<SpinningDoorCardProps> = ({ title, description }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={`${styles.spinningCard} perspective-1000`}>
      <div className={`${styles.spinningCardInner} transform-preserve-3d ${isVisible ? styles.rotateY180 : ''}`}>
        <div className={`${styles.spinningCardFront} backface-hidden`}>
          <div className={styles.spinningCardContent}>
            <div className={styles.spinningCardImage}>
              <img 
                src="/apart3D_trans_cz.png" 
                alt="Logo" 
                className={styles.logoImage}
              />
            </div>
          </div>
        </div>
        
        <div className={`${styles.spinningCardBack} backface-hidden`}>
          <div className={styles.spinningCardContent}>
            <h3 className={styles.spinningCardTitle}>{title}</h3>
            <p className={styles.spinningCardDescription}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningDoorCard;