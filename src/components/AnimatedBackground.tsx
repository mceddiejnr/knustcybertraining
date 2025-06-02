
import { useEffect, useState } from "react";
import { Shield, Lock, Code, Eye, Wifi, Database, Server, Key, Monitor } from "lucide-react";

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    type: 'code' | 'icon' | 'dot' | 'line';
    icon?: any;
    code?: string;
    angle?: number;
  }>>([]);

  const securityIcons = [Shield, Lock, Eye, Wifi, Database, Server, Key, Monitor];
  const codeSnippets = [
    'auth.verify()', 'encrypt.data()', 'firewall.active', 'ssl.secure()', 'hash.sha256()',
    'scan.threat()', 'backup.create()', 'monitor.network()', 'validate.token()'
  ];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 25; i++) {
        const type = Math.random() < 0.3 ? 'code' : Math.random() < 0.6 ? 'icon' : Math.random() < 0.8 ? 'dot' : 'line';
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 25 + 15,
          speed: Math.random() * 30 + 15,
          type,
          icon: type === 'icon' ? securityIcons[Math.floor(Math.random() * securityIcons.length)] : null,
          code: type === 'code' ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)] : null,
          angle: Math.random() * 360,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced grid pattern with professional feel */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(51, 65, 85, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(51, 65, 85, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-slide 25s linear infinite'
        }}
      ></div>

      {/* Professional floating elements */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute transition-all duration-1000 ease-in-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float-professional ${particle.speed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          {particle.type === 'icon' && particle.icon && (
            <div className="p-3 bg-gradient-to-br from-slate-500/10 to-blue-500/10 rounded-xl backdrop-blur-sm border border-slate-300/20 shadow-lg">
              <particle.icon className="w-5 h-5 text-slate-600" />
            </div>
          )}
          
          {particle.type === 'code' && (
            <div className="px-3 py-2 bg-gradient-to-br from-slate-800/20 to-blue-800/20 rounded-lg backdrop-blur-sm border border-slate-400/30 shadow-md">
              <code className="text-xs text-slate-700 font-mono font-semibold">{particle.code}</code>
            </div>
          )}
          
          {particle.type === 'dot' && (
            <div 
              className="rounded-full bg-gradient-to-br from-slate-400 to-blue-400 opacity-40 shadow-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
            ></div>
          )}

          {particle.type === 'line' && (
            <div 
              className="bg-gradient-to-r from-transparent via-slate-400 to-transparent opacity-30"
              style={{
                width: `${particle.size * 2}px`,
                height: '2px',
                transform: `rotate(${particle.angle}deg)`
              }}
            ></div>
          )}
        </div>
      ))}

      {/* Professional scanning effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-slate-500 to-transparent opacity-20"
          style={{ animation: 'professional-scan 6s linear infinite' }}
        ></div>
      </div>

      {/* Subtle hexagon pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.3'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'hexagon-drift 20s linear infinite'
        }}
      ></div>

      <style>{`
        @keyframes float-professional {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.7; }
          25% { transform: translateY(-15px) rotate(90deg) scale(1.05); opacity: 1; }
          50% { transform: translateY(-10px) rotate(180deg) scale(0.95); opacity: 0.8; }
          75% { transform: translateY(-20px) rotate(270deg) scale(1.1); opacity: 0.9; }
        }
        
        @keyframes professional-scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes grid-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes hexagon-drift {
          0% { transform: translateX(-30px) translateY(-30px); }
          100% { transform: translateX(30px) translateY(30px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
