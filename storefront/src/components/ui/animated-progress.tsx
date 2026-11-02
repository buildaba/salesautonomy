'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorClassName?: string;
}

export function AnimatedProgress({
  value,
  indicatorClassName = 'bg-white',
  className = '',
  ...props
}: AnimatedProgressProps) {
  return (
    <div className={`relative w-full overflow-hidden rounded-full ${className}`} {...props}>
      <motion.div
        className={`h-full w-full flex-1 transition-all ${indicatorClassName}`}
        initial={{ x: '-100%' }}
        whileInView={{ x: `-${100 - value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
}
