import React from 'react';
import Link from 'next/link';
import SocialLinks from '@/components/social-media';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">LOGO</h3>
            <p className="text-sm">
              Designing and building beautiful spaces since 2024.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/3d">3D</FooterLink>
              <FooterLink href="/apartments">Mieszkania</FooterLink>
              <FooterLink href="/portfolio">O nas</FooterLink>
              <FooterLink href="/contact">Kontakt</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-sm space-y-2">
              <p>123 Main Street</p>
              <p>Anytown, AT 12345</p>
              <p>Email: info@example.com</p>
              <p>Phone: (555) 123-4567</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <SocialLinks />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-500 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-white hover:text-pink-300 transition duration-300 ease-in-out"
      >
        {children}
      </Link>
    </li>
  );
}