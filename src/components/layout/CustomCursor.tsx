import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide cursor on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Primary Cursor (Arrow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`transform transition-all duration-300 ${isHovering ? 'scale-50 opacity-0' : 'scale-100 opacity-100'}`}
          style={{
            filter: 'drop-shadow(0 0 8px rgba(0, 245, 255, 0.8))'
          }}
        >
          <path 
            d="M4 2L22 10L14 14L10 22L4 2Z" 
            fill="rgba(0, 245, 255, 0.2)" 
            stroke="#00f5ff" 
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path 
            d="M14 14L22 22" 
            stroke="#00f5ff" 
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Secondary Cursor (Premium Hover Effect) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full flex items-center justify-center"
        animate={{
          x: mousePosition.x - (isHovering ? 32 : 4),
          y: mousePosition.y - (isHovering ? 32 : 4),
          width: isHovering ? 64 : 8,
          height: isHovering ? 64 : 8,
          opacity: isHovering ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(0, 245, 255, 0.08)' : 'rgba(0, 245, 255, 0)',
          border: isHovering ? '1px solid rgba(0, 245, 255, 0.4)' : '0px solid rgba(0, 245, 255, 0)',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.6 }}
        style={{
          backdropFilter: isHovering ? 'blur(4px)' : 'none',
          boxShadow: isHovering ? '0 0 20px rgba(0, 245, 255, 0.2), inset 0 0 15px rgba(0, 245, 255, 0.1)' : 'none'
        }}
      >
        {/* Inner dot */}
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-brand-cyan"
          animate={{
            scale: isHovering ? 1 : 0,
            opacity: isHovering ? 1 : 0
          }}
          transition={{ duration: 0.2, delay: 0.05 }}
          style={{ boxShadow: '0 0 8px rgba(0, 245, 255, 0.8)' }}
        />
      </motion.div>
    </>
  );
}
