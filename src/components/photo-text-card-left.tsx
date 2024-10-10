// components/PhotoTextCard.tsx
import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface PhotoTextCardLeftProps {
  image: StaticImageData;
  title: string;
  description: string;
}

const PhotoTextCardLeft: React.FC<PhotoTextCardLeftProps> = ({ image, title, description }) => {
  return (
    <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-700">{description}</p>
      </div>
      <div className="w-1/2">
        <Image src={image} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default PhotoTextCardLeft;
