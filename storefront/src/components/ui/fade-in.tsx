'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({ children, delay = 0, direction = 'up', className = '' }: FadeInProps) {
  const directionOffset = {
    up: 20,
    down: -20,
    left: 20,
    right: -20,
    none: 0,
  };

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: offset }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
