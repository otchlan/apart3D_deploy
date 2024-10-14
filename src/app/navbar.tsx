"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import SocialLinks from '@/components/social-media';
import { Menu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold tracking-tight">
            <Link href="/" className="hover:text-pink-300 transition duration-300">LOGO</Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/3d">3D</NavLink>
            <NavLink href="/apartments">Mieszkania</NavLink>
            <NavLink href="/portfolio">O nas</NavLink>
            <NavLink href="/contact">Kontakt</NavLink>
            <NavLink href="/example">Example</NavLink>
            <NavLink href="/localisation">Lokalizacja</NavLink>
          </div>
          
          <div className="hidden md:block">
            <SocialLinks />
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-pink-300 transition duration-300"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/3d">3D</MobileNavLink>
            <MobileNavLink href="/apartments">Mieszkania</MobileNavLink>
            <MobileNavLink href="/portfolio">O nas</MobileNavLink>
            <MobileNavLink href="/contact">Kontakt</MobileNavLink>
            <MobileNavLink href="/example">Example</MobileNavLink>
            <MobileNavLink href="/localisation">Lokalizacja</MobileNavLink>
          </div>
          <div className="px-4 py-3">
            <SocialLinks />
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-white hover:text-pink-300 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="text-white hover:bg-indigo-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300"
    >
      {children}
    </Link>
  );
}