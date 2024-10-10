import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <Facebook className="text-white hover:text-gray-300" size={24} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <Instagram className="text-white hover:text-gray-300" size={24} />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <Youtube className="text-white hover:text-gray-300" size={24} />
      </a>
    </div>
  );
}
