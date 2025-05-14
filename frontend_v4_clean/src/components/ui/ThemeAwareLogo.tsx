"use client";

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeAwareLogoProps {
  lightSrc?: string;
  darkSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

const ThemeAwareLogo: React.FC<ThemeAwareLogoProps> = ({
  lightSrc = "/trade_caddie_logo_default_white_bg.png", // Correct: light logo with white background
  darkSrc = "/trade_caddie_logo_default_dark.png", // Corrected: dark mode logo file name
  alt,
  width,
  height,
  className,
  priority = false,
}) => {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentSrc = (mounted && resolvedTheme === 'dark') ? darkSrc : lightSrc;
  
  if (!mounted) {
    // To prevent hydration mismatch, it's often safer to return null or a placeholder
    // until the component is mounted and the theme is resolved.
    // However, for a logo, showing the light version by default is often acceptable.
    // return null; // Or a placeholder like <div style={{ width, height, backgroundColor: '#ccc' }} />
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
};

export default ThemeAwareLogo;

