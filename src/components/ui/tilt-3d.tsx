import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface Tilt3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // tilt degrees, default 8
  shadow?: boolean;
  gloss?: boolean; // glossy light reflection
  scale?: number; // hover scale, default 1.02
  perspective?: number; // px, default 800
  style?: React.CSSProperties;
}

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

export function Tilt3D({
  children,
  className = '',
  intensity = 8,
  shadow = true,
  gloss = true,
  scale = 1.02,
  perspective = 800,
  style,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawRotateX = useTransform(mouseY, [0, 1], [intensity, -intensity]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-intensity, intensity]);

  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const glossX = useTransform(mouseX, [0, 1], [0, 100]);
  const glossY = useTransform(mouseY, [0, 1], [0, 100]);

  const shadowX = useTransform(rotateY, (v) => v * 2);
  const shadowY = useTransform(rotateX, (v) => v * -2);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mouseX.set(nx);
    mouseY.set(ny);
  }, [mouseX, mouseY]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered ? scale : 1 }}
      transition={{ type: 'spring', ...springConfig }}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}

      {/* Glossy light reflection overlay */}
      {gloss && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            background: useTransform(
              [glossX, glossY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)`
            ),
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Layered depth shadow */}
      {shadow && (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[inherit] -z-10"
          style={{
            boxShadow: useTransform(
              [shadowX, shadowY],
              ([sx, sy]) =>
                isHovered
                  ? `${sx}px ${sy}px 15px rgba(0,0,0,0.06), ${sx * 1.5}px ${sy * 1.5}px 35px rgba(0,0,0,0.08), ${sx * 2}px ${sy * 2}px 60px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.03)`
                  : '0 1px 3px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.02)'
            ),
            transition: 'box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      )}
    </motion.div>
  );
}

// Premium button variant with tighter tilt + lift effect
export function TiltButton({
  children,
  className = '',
  onClick,
  type,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rawRotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rawRotateY = useTransform(mouseX, [0, 1], [-4, 4]);

  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 12, mass: 0.08 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 12, mass: 0.08 });

  const glossX = useTransform(mouseX, [0, 1], [0, 100]);
  const glossY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      type={type}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 500,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      animate={{
        scale: isHovered ? 1.06 : 1,
        y: isHovered ? -2 : 0,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 14, mass: 0.08 }}
    >
      {children}

      {/* Button gloss */}
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
        style={{
          background: useTransform(
            [glossX, glossY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 50%, transparent 80%)`
          ),
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      />
    </motion.button>
  );
}
