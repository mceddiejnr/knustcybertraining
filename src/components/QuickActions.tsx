
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button 
        onClick={() => window.location.href = "/"} 
        variant="outline"
        className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
      >
        Back to Home
      </Button>
      <Button 
        onClick={() => window.location.href = "/admin/login"} 
        variant="outline"
        className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
      >
        <Shield className="w-4 h-4 mr-2" />
        Admin Panel
      </Button>
    </div>
  );
};

export default QuickActions;
