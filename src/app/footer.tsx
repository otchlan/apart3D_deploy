import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from '@/components/social-media';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Image
              src="/apart3D_trans_b.png"
              alt="Logo APART 3D"
              width={120} // Dopasuj szerokość w razie potrzeby
              height={30} // Dopasuj wysokość w razie potrzeby
              className="object-contain"
            />
            <p className="text-sm">
              Projektowanie i budowanie pięknych przestrzeni.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4"></h4>
            <ul className="space-y-2">
              <FooterLink href="/">Strona główna</FooterLink>
              <FooterLink href="/3d">3D</FooterLink>
              <FooterLink href="/portfolio">O nas</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <address className="not-italic text-sm space-y-2">
              <p>mstachura@deeptechlabs.pl</p>
              <p>+48 791 358 08(6+3)</p>
              <p>
                <a
                  href="https://calendly.com/mstachura-deeptechlabs/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold hover:text-pink-300 transition duration-300 ease-in-out shadow-animation"
                >
                  Umów się na rozmowę
                </a>
              </p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Obserwuj nas</h4>
            <SocialLinks />
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-500 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} APART 3D. Wszelkie prawa zastrzeżone.
          </p>
          <p>
            Niektóre zdjęcia na tej stronie zostały udostępnione przez Freepik.
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
