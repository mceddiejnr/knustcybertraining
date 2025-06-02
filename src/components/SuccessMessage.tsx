
import { Button } from "@/components/ui/button";
import { Lock, CircuitBoard } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/20 p-8 text-center relative overflow-hidden">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-green-500/20 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-500/20 rounded-full border border-green-400/30 relative">
                <Lock className="w-12 h-12 text-green-400" />
                {/* Success checkmark overlay */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Welcome, {attendeeName}!
            </h2>
            
            <div className="bg-green-500/10 rounded-xl p-4 mb-6 border border-green-400/30">
              <p className="text-green-300 font-medium">
                Thank you for joining! Your attendance has been recorded.
              </p>
            </div>
            
            <p className="text-slate-300">
              You're all set for today's cybersecurity training session. 
              Ready to explore what we have planned for you?
            </p>
          </div>

          {/* Updated button with "Next" label */}
          <Button 
            onClick={onViewProgram}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 border border-cyan-400/30 shadow-lg shadow-cyan-500/25"
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
