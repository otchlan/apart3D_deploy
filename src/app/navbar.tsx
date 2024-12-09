"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import SocialLinks from '@/components/social-media';
import styles from './navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTextStroke = () => {
      if (navRef.current) {
        const bgColor = window.getComputedStyle(navRef.current).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
          const textStrokeColor = brightness > 128 ? 'black' : 'white';
          const navLinks = navRef.current.querySelectorAll(`.${styles.navLink}`);
          navLinks.forEach((link) => {
            (link as HTMLElement).style.webkitTextStroke = `1px ${textStrokeColor}`;
          });
        }
      }
    };

    updateTextStroke();
    window.addEventListener('scroll', updateTextStroke);
    return () => window.removeEventListener('scroll', updateTextStroke);
  }, []);

  return (
    <nav className={styles.navbar} ref={navRef}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Link href="/" className={styles.navLink}>
              <Image
                src="/apart3D_trans_b.png"
                alt="APART 3D Logo"
                width={60} 
                height={20} 
                className="object-contain"
              />
            </Link>
          </div>
          
          <div className={styles.navLinks}>
            <NavButton onClick={() => window.location.href = "/"}>Strona główna</NavButton>          
            <NavButton onClick={() => window.location.href = "/3d"}>Apartamenty</NavButton>
            <NavButton onClick={() => window.location.href = "/about-us"}>O nas</NavButton>
            <NavButton onClick={() => window.location.href = "/contact"}>Kontakt</NavButton>
          </div>
          
          <div className={styles.socialLinks}>
            <SocialLinks />
          </div>
          
          {/* Ensure this button only appears on mobile view */}
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ''}`}
            >
              
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className={styles.mobileMenu}>
          <div>
            <MobileNavButton onClick={() => window.location.href = "/"}>Strona główna</MobileNavButton>
            <MobileNavButton onClick={() => window.location.href = "/3d"}>Mieszkania</MobileNavButton>
            <MobileNavButton onClick={() => window.location.href = "/about-us"}>O nas</MobileNavButton>
            <MobileNavButton onClick={() => window.location.href = "/contact"}>Kontakt</MobileNavButton>
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

function NavButton({ onClick, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.navLink}
    >
      {children}
    </button>
  );
}

function MobileNavButton({ onClick, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={styles.mobileNavLink}
    >
      {children}
    </button>
  );
}