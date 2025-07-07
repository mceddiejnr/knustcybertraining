
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Reply, Edit, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface Question {
  id: string;
  name: string;
  email: string | null;
  question: string;
  status: string;
  created_at: string;
  answered_at: string | null;
  answer: string | null;
}

interface QuestionCardProps {
  question: Question;
  onStartAnswering: (questionId: string, existingAnswer?: string) => void;
  onStartEditing: (question: Question) => void;
  onDelete: (questionId: string) => void;
}

const QuestionCard = ({ question, onStartAnswering, onStartEditing, onDelete }: QuestionCardProps) => {
  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-white text-sm">{question.name}</h3>
          {question.email && (
            <p className="text-xs text-gray-400">{question.email}</p>
          )}
          <p className="text-xs text-gray-500">
            {new Date(question.created_at).toLocaleDateString()} at{' '}
            {new Date(question.created_at).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={question.status === 'answered' ? 'default' : 'secondary'}
            className={question.status === 'answered' ? 'bg-green-600' : 'bg-yellow-600'}
          >
            {question.status === 'answered' ? (
              <>
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Answered
              </>
            ) : (
              <>
                <Clock className="w-3 h-3 mr-1" />
                Pending
              </>
            )}
          </Badge>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-gray-300 text-sm leading-relaxed">
          {question.question}
        </p>
      </div>

      {question.answer && (
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <Reply className="w-4 h-4 text-green-400" />
            <span className="text-xs font-medium text-green-400">Your Answer:</span>
            <span className="text-xs text-gray-400">
              {question.answered_at && new Date(question.answered_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-300 text-sm">{question.answer}</p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          onClick={() => onStartAnswering(question.id, question.answer || "")}
          variant="outline"
          size="sm"
          className="text-xs border-green-500/30 text-green-400 hover:bg-green-600/10"
        >
          <Reply className="w-3 h-3 mr-1" />
          {question.answer ? 'Edit Answer' : 'Answer Question'}
        </Button>
        <Button
          onClick={() => onStartEditing(question)}
          variant="outline"
          size="sm"
          className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-600/10"
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit Question
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-red-500/30 text-red-400 hover:bg-red-600/10"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-gray-800 border-gray-600">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Question</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to delete this question? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-gray-500 text-gray-400">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => onDelete(question.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default QuestionCard;
