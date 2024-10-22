import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <Facebook className="text-white hover:text-[#1877F2]" size={24} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <Instagram className="text-white hover:text-[#E4405F]" size={24} />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
        <Youtube className="text-white hover:text-[#FF0000]" size={24} />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <Linkedin className="text-white hover:text-[#0A66C2]" size={24} />
      </a>
    </div>
  );
}