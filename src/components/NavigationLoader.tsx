
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoadingScreen } from '@/components/ui/loading-screen';

const NavigationLoader = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNavigating(true);
    
    // Show loader for a brief moment during navigation
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 z-50">
      <LoadingScreen 
        message="NAVIGATING..."
        variant="cyber"
        overlay={true}
      />
    </div>
  );
};

export default NavigationLoader;
