
import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'cyber' | 'minimal';
}

const Loader = ({ className, size = 'md', variant = 'default' }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  if (variant === 'cyber') {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-green-500/30"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-green-400 animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute inset-2 rounded-full bg-green-400 animate-pulse opacity-60"></div>
        
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-full bg-green-400/10 animate-ping"></div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn("flex space-x-1", className)}>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute inset-0 rounded-full border-4 border-gray-600"></div>
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-400 animate-spin"></div>
    </div>
  );
};

export { Loader };
