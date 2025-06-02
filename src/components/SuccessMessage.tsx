
import { Button } from "@/components/ui/button";
import { Lock, CircuitBoard } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      {/* KNUST Logo */}
      <div className="absolute top-8 left-8">
        <img 
          src="/lovable-uploads/6ce08c53-d1c5-447f-a093-4655c351e1a8.png" 
          alt="KNUST Logo" 
          className="h-16 w-auto opacity-90"
        />
      </div>

      <div className="max-w-md w-full bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-500/30 p-8 text-center relative overflow-hidden">
        {/* KNUST-themed glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-600/20 via-amber-500/20 to-green-600/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-600/20 rounded-full border border-green-500/40 relative">
                <Lock className="w-12 h-12 text-green-400" />
                {/* Success checkmark overlay */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-amber-400 via-red-400 to-green-400 bg-clip-text text-transparent">
              Welcome, {attendeeName}!
            </h2>
            
            <div className="bg-green-600/20 rounded-xl p-4 mb-6 border border-green-500/40">
              <p className="text-green-300 font-medium">
                Thank you for joining KNUST's cybersecurity training! Your attendance has been recorded.
              </p>
            </div>
            
            <p className="text-slate-300">
              You're all set for today's cybersecurity training session at KNUST Library. 
              Ready to explore what we have planned for you?
            </p>
          </div>

          <Button 
            onClick={onViewProgram}
            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-amber-600 hover:from-red-600 hover:via-red-500 hover:to-amber-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 border border-amber-500/40 shadow-lg shadow-red-600/25"
          >
            <CircuitBoard className="w-5 h-5" />
            <span>Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
