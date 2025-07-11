
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock } from "lucide-react";

interface ProgressIndicatorProps {
  completed: number;
  total: number;
  showDetails?: boolean;
}

const ProgressIndicator = ({ completed, total, showDetails = true }: ProgressIndicatorProps) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-white">Training Progress</span>
        </div>
        <span className="text-sm text-gray-400">
          {completed}/{total} sessions
        </span>
      </div>
      
      <Progress 
        value={percentage} 
        className="h-2 bg-gray-700" 
      />
      
      {showDetails && (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{percentage}% Complete</span>
          {percentage === 100 ? (
            <span className="text-green-400 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed!
            </span>
          ) : (
            <span className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              In Progress
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;
