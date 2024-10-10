// components/Navbar.js
import Link from 'next/link';
import SocialLinks from '@/components/social-media';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-evenly items-center py-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/3d" className="hover:text-gray-300">3D</Link>
          <Link href="/apartments" className="hover:text-gray-300">Mieszkania</Link>
          
          <div className="text-2xl font-bold">
            <Link href="/">LOGO</Link>
          </div>

          <Link href="/portfolio" className="hover:text-gray-300">O nas</Link>
          <Link href="/contact" className="hover:text-gray-300">Kontakt</Link>
          <SocialLinks />
        </div>
      </div>
    </nav>
  );
}
