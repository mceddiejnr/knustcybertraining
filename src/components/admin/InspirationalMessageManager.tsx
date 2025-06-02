
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, RefreshCw, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InspirationalMessageManager = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const defaultMessages = [
    "🔐 Every click, every connection, every choice you make in the digital world matters. Today, you're not just learning about cybersecurity – you're becoming a digital guardian, protecting not only yourself but your community. Your awareness is your superpower! 💪✨",
    "🌟 In a world where data is the new gold, you are the vault keeper. The knowledge you gain today transforms you from a user into a protector. Every security practice you learn creates ripples of safety that extend far beyond yourself. Be the change the digital world needs! 🚀",
    "🛡️ Cybersecurity isn't just about protecting systems – it's about protecting dreams, protecting futures, protecting the trust that connects us all. You have the power to make the internet a safer place for everyone. Step into your role as a cyber hero! 🦸‍♀️🦸‍♂️"
  ];

  useEffect(() => {
    // Load saved message or use default
    const savedMessage = localStorage.getItem("inspirationalMessage");
    if (savedMessage) {
      setCurrentMessage(savedMessage);
    } else {
      setCurrentMessage(defaultMessages[0]);
    }
  }, []);

  const generateNewMessage = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation with predefined messages
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const randomMessage = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    setCurrentMessage(randomMessage);
    setIsGenerating(false);
    
    toast({
      title: "New message generated! ✨",
      description: "A fresh inspirational message has been created for your participants.",
    });
  };

  const saveMessage = () => {
    localStorage.setItem("inspirationalMessage", currentMessage);
    setIsEditing(false);
    
    toast({
      title: "Message saved! 💾",
      description: "Your custom inspirational message has been saved successfully.",
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-green-200/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <span>Manage Inspiration Messages</span>
        </CardTitle>
        <CardDescription>
          Create and manage inspirational messages for cybersecurity workshop participants
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Message Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Current Message</h3>
            <div className="flex gap-2">
              <Button
                onClick={generateNewMessage}
                variant="outline"
                size="sm"
                disabled={isGenerating}
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? "Generating..." : "Generate New"}</span>
              </Button>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isEditing ? "Cancel Edit" : "Edit Message"}</span>
              </Button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Write your inspirational message here..."
                className="min-h-[120px] resize-none"
              />
              <div className="flex justify-end">
                <Button
                  onClick={saveMessage}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Message</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200/50">
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentMessage}
              </p>
            </div>
          )}
        </div>

        {/* AI Generation Info */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200/50">
          <h4 className="font-semibold text-yellow-800 mb-2">🤖 AI Message Generation</h4>
          <p className="text-yellow-700 text-sm">
            Messages are generated using the prompt: <em>"Generate an inspirational message for cybersecurity workshop participants, highlighting the value of cyber awareness and digital safety."</em>
          </p>
        </div>

        {/* Preview */}
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800">Preview in App</h4>
          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-4 border border-blue-200/50">
            <p className="text-sm text-gray-600 mb-2">This is how it appears to participants:</p>
            <div className="bg-white rounded-md p-3 shadow-sm">
              <p className="text-gray-800 text-sm">{currentMessage}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InspirationalMessageManager;
