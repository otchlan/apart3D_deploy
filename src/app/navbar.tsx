// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left Tabs */}
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/investment" className="hover:text-gray-300">Inwestycja</Link>
            <Link href="/apartments" className="hover:text-gray-300">Mieszkania</Link>
          </div>

          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link href="/">LOGO</Link>
          </div>

          {/* Right Tabs */}
          <div className="flex space-x-4">
            <Link href="/portfolio" className="hover:text-gray-300">O nas</Link>
            <Link href="/contact" className="hover:text-gray-300">Galeria</Link>
            <Link href="/contact" className="hover:text-gray-300">Kontakt</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
