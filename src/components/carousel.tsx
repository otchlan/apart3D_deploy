"use client"
import React, { useEffect, useState, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';

type CarouselProps = {
  images: { src: StaticImageData; width: number; height: number }[];
  visibleItems?: number;
};

const Carousel: React.FC<CarouselProps> = ({ images, visibleItems = 1 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(0, images.length - visibleItems);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex >= maxIndex ? 0 : prevIndex + 1)
    );
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      (prevIndex <= 0 ? maxIndex : prevIndex - 1)
    );
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${100 / visibleItems}%` }}
          >
            <Image
              src={image.src}
              alt={`Slide ${index}`}
              width={image.width}
              height={image.height}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Left and Right buttons */}
      <button
        onClick={prevSlide}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800 ${currentIndex === 0 && 'hidden'}`}
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white p-2 rounded-full hover:bg-gray-800 ${currentIndex === maxIndex && 'hidden'}`}
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
