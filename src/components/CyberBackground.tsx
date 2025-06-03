
import { Shield, Terminal, ShieldCheck, Fingerprint } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const CyberBackground = () => {
  return (
    <>
      <AnimatedBackground />
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Shield className="absolute top-20 left-10 w-6 h-6 text-green-500/20 animate-pulse" />
        <Terminal className="absolute top-40 right-20 w-4 h-4 text-green-400/20 animate-bounce" />
        <ShieldCheck className="absolute bottom-40 left-20 w-5 h-5 text-green-300/20 animate-pulse" />
        <Fingerprint className="absolute bottom-20 right-10 w-6 h-6 text-green-500/20 animate-pulse" />
      </div>
    </>
  );
};

export default CyberBackground;
