
import { Shield, Lock, Code, Eye, Wifi, Database } from "lucide-react";
import { useEffect, useState } from "react";

const CybersecurityBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    type: 'code' | 'icon' | 'dot';
    icon?: any;
    code?: string;
  }>>([]);

  const securityIcons = [Shield, Lock, Eye, Wifi, Database];
  const codeSnippets = [
    'if(secure)', 'encrypt()', 'auth.verify()', 'hash.md5()', 'ssl.connect()',
    'firewall.active', 'scan.malware()', 'backup.create()', 'log.security()'
  ];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        const type = Math.random() < 0.4 ? 'code' : Math.random() < 0.7 ? 'icon' : 'dot';
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 20 + 10,
          speed: Math.random() * 20 + 10,
          type,
          icon: type === 'icon' ? securityIcons[Math.floor(Math.random() * securityIcons.length)] : null,
          code: type === 'code' ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)] : null,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}
      ></div>

      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${Math.random() * 10}s`
          }}
        >
          {particle.type === 'icon' && particle.icon && (
            <div className="p-2 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full backdrop-blur-sm border border-green-300/30">
              <particle.icon className="w-4 h-4 text-green-400" />
            </div>
          )}
          
          {particle.type === 'code' && (
            <div className="px-2 py-1 bg-gradient-to-br from-red-400/20 to-yellow-400/20 rounded-md backdrop-blur-sm border border-yellow-300/30">
              <code className="text-xs text-yellow-300 font-mono">{particle.code}</code>
            </div>
          )}
          
          {particle.type === 'dot' && (
            <div 
              className="rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-60"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`
              }}
            ></div>
          )}
        </div>
      ))}

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan opacity-30"></div>
      </div>

      {/* Binary rain effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-xs animate-binary-rain"
            style={{
              left: `${i * 12.5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '15s'
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="mb-4">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        
        @keyframes binary-rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        .animate-float {
          animation: float var(--duration, 8s) ease-in-out infinite;
        }
        
        .animate-scan {
          animation: scan 4s linear infinite;
        }
        
        .animate-binary-rain {
          animation: binary-rain var(--duration, 15s) linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CybersecurityBackground;
