import React from 'react';
import Image, { StaticImageData } from 'next/image';
import FancyButton from '@/components/button'

interface PhotoTextCardLeftProps {
  image: StaticImageData;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const PhotoTextCardLeft: React.FC<PhotoTextCardLeftProps> = ({ 
  image, 
  title, 
  description, 
  buttonText,
  onButtonClick 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-102 hover:shadow-xl">
      <div className="w-full md:w-1/2 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        {buttonText && (
          <FancyButton onClick={onButtonClick}>
            {buttonText}
          </FancyButton>
        )}
      </div>
      <div className="w-full md:w-1/2">
        <Image 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default PhotoTextCardLeft;