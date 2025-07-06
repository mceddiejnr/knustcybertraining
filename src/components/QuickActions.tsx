
import { Button } from "@/components/ui/button";
import { Shield, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QuestionForm from "@/components/QuestionForm";

const QuickActions = () => {
  const navigate = useNavigate();
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button 
        onClick={() => navigate("/")} 
        variant="outline"
        className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
      >
        Back to Home
      </Button>
      
      <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            className="bg-gray-800/80 backdrop-blur-sm border-green-500/30 text-green-400 hover:bg-gray-700 hover:border-green-400"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-green-500/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Ask a Question</DialogTitle>
          </DialogHeader>
          <QuestionForm />
        </DialogContent>
      </Dialog>
      
      <Button 
        onClick={() => navigate("/admin")} 
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
