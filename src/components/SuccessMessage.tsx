
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar } from "lucide-react";

interface SuccessMessageProps {
  attendeeName: string;
  onViewProgram: () => void;
}

const SuccessMessage = ({ attendeeName, onViewProgram }: SuccessMessageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Welcome, {attendeeName}!
          </h2>
          
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <p className="text-green-800 font-medium">
              Thank you for joining! Your attendance has been recorded.
            </p>
          </div>
          
          <p className="text-gray-600">
            You're all set for today's cybersecurity training session. 
            Ready to explore what we have planned for you?
          </p>
        </div>

        <Button 
          onClick={onViewProgram}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <Calendar className="w-5 h-5" />
          <span>View Program Outline</span>
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessage;
