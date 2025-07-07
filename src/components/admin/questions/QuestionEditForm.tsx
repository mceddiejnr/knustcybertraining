
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

interface QuestionEditFormProps {
  question: Question;
  onSave: (questionId: string, questionText: string, name: string, email: string) => void;
  onCancel: () => void;
}

const QuestionEditForm = ({ question, onSave, onCancel }: QuestionEditFormProps) => {
  const [editQuestionText, setEditQuestionText] = useState(question.question);
  const [editName, setEditName] = useState(question.name);
  const [editEmail, setEditEmail] = useState(question.email || "");

  const handleSave = () => {
    onSave(question.id, editQuestionText, editName, editEmail);
  };

  return (
    <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 space-y-2">
          <Input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Name"
            className="bg-gray-600/50 border-gray-500 text-white text-sm"
          />
          <Input
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email (optional)"
            className="bg-gray-600/50 border-gray-500 text-white text-sm"
          />
        </div>
      </div>

      <div className="mb-3">
        <Textarea
          value={editQuestionText}
          onChange={(e) => setEditQuestionText(e.target.value)}
          placeholder="Question text"
          className="bg-gray-600/50 border-gray-500 text-white text-sm"
          rows={3}
        />
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={handleSave}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-xs"
          disabled={!editQuestionText.trim() || !editName.trim()}
        >
          Save Changes
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          size="sm"
          className="text-xs border-gray-500 text-gray-400"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QuestionEditForm;
