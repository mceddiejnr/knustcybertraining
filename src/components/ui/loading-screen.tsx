
import React from 'react';
import { Loader } from './loader';
import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  message?: string;
  variant?: 'default' | 'cyber' | 'minimal';
  overlay?: boolean;
  className?: string;
}

const LoadingScreen = ({ 
  message = "Loading...", 
  variant = 'cyber',
  overlay = false,
  className 
}: LoadingScreenProps) => {
  const baseClasses = "flex flex-col items-center justify-center space-y-4";
  const overlayClasses = "fixed inset-0 bg-black/50 backdrop-blur-sm z-50";
  const containerClasses = overlay ? overlayClasses : "min-h-screen";

  return (
    <div className={cn(baseClasses, containerClasses, className)}>
      <Loader size="lg" variant={variant} />
      <div className="text-center space-y-2">
        <p className="text-white font-mono text-sm tracking-wider">
          {message}
        </p>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export { LoadingScreen };
