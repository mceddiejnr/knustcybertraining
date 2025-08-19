import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { useDiscussions } from "@/hooks/useDiscussions";

interface CreateDiscussionDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateDiscussionDialog = ({ open, onClose }: CreateDiscussionDialogProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createDiscussion } = useDiscussions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = await createDiscussion(
      title,
      content,
      authorName,
      authorEmail,
      category
    );

    if (success) {
      // Reset form
      setTitle("");
      setContent("");
      setAuthorName("");
      setAuthorEmail("");
      setCategory("general");
      onClose();
    }

    setIsSubmitting(false);
  };

  const categories = [
    { value: "general", label: "General" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "training", label: "Training" },
    { value: "qa", label: "Questions & Answers" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-800 border-green-500/30">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-white">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <span>Start New Discussion</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName" className="text-sm font-semibold text-gray-200 mb-2 block">
                Your Name *
              </Label>
              <Input
                id="authorName"
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name"
                className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="authorEmail" className="text-sm font-semibold text-gray-200 mb-2 block">
                Email (Optional)
              </Label>
              <Input
                id="authorEmail"
                type="email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-semibold text-gray-200 mb-2 block">
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-gray-700/80 border-gray-600 text-white focus:border-green-400 focus:ring-green-400/30">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {categories.map((cat) => (
                  <SelectItem 
                    key={cat.value} 
                    value={cat.value}
                    className="text-white hover:bg-gray-600 focus:bg-gray-600"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-semibold text-gray-200 mb-2 block">
              Discussion Title *
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-sm font-semibold text-gray-200 mb-2 block">
              Discussion Content *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ask questions, or start a conversation..."
              className="bg-gray-700/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30 min-h-[120px] resize-none"
              rows={5}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim() || !content.trim() || !authorName.trim()}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                "Start Discussion"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiscussionDialog;