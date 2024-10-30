// src/components/SpinningFeatureCardComponent.tsx
import React, { useEffect, useRef, useState } from 'react';

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
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      },
      { threshold: 0.5 } // Adjust the threshold as needed
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
    <div 
      ref={cardRef}
      className="spinning-card"
    >
      <div
        className={`spinning-card-inner ${isVisible ? 'rotate-y-180' : 'rotate-y-0'}`}
      >
        {/* Front side */}
        <div className="spinning-card-front">
          <div className="spinning-card-content">
            <div className="spinning-card-image">
              <img 
                src="/apart3D_trans_cz.png" 
                alt="Logo" 
                className="logo-image"
              />
            </div>
          </div>
        </div>
        
        {/* Back side */}
        <div className="spinning-card-back">
          <div className="spinning-card-content">
            <h3 className="spinning-card-title">{title}</h3>
            <p className="spinning-card-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS for the component
const style = document.createElement('style');
style.textContent = `
  .spinning-card {
    position: relative;
    height: 14rem; /* 96 in Tailwind units */
    perspective: 1000px;
  }

  .spinning-card-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 1s;
    transform-style: preserve-3d;
  }

  .rotate-y-0 {
    transform: rotateY(0deg);
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }

  .spinning-card-front, .spinning-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 1.5rem; /* Equivalent to p-6 */
  }

  .spinning-card-front {
    background: linear-gradient(to bottom right, #e0c3fc, #8ec5fc);
  }

  .spinning-card-back {
    background: linear-gradient(to bottom right, #8ec5fc, #e0c3fc);
    transform: rotateY(180deg);
  }

  .spinning-card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748; /* Equivalent to text-gray-800 */
    margin-bottom: 1rem;
  }

  .spinning-card-image {
    width: 4rem; /* 16 in Tailwind units */
    height: 4rem;
    margin: 0 auto;
    margin-bottom: 1rem;
  }

  .logo-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .spinning-card-description {
    color: #4a5568; /* Equivalent to text-gray-600 */
  }
`;
document.head.appendChild(style);

export default SpinningDoorCard;
