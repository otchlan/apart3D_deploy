// SlideInSection.tsx
import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SlideInSectionProps {
  children: ReactNode;
  className?: string;
}

const SlideInSection: React.FC<SlideInSectionProps> = ({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, 
    [0, 0.5], 
    ["-100vw", "0vw"]
  );

  return (
    <motion.section
      ref={ref}
      style={{ 
        x,
        clipPath: "polygon(0 0, 100% 10%, 100% 90%, 0 100%)",
        backgroundImage: "url('/background-1.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
      className={`${className} relative overflow-hidden bg-purple-600`}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="relative z-10 text-white">
        {children}
      </div>
    </motion.section>
  );
};

export default SlideInSection;
