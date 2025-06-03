
import { Shield, Lock, Terminal } from "lucide-react";

const SecurityIcon = () => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="p-4 bg-gradient-to-br from-green-600 to-green-700 rounded-full shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent rounded-full animate-pulse"></div>
          <Shield className="w-6 h-6 text-white relative z-10" />
          
          {/* Orbiting Security Elements */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center animate-spin">
            <Lock className="w-3 h-3 text-white" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center animate-bounce">
            <Terminal className="w-2 h-2 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIcon;
