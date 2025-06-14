
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";

interface InspirationalMessageProps {
  message: string;
}

const InspirationalMessage = ({ message }: InspirationalMessageProps) => {
  if (!message) return null;

  return (
    <Card className="bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border-green-400/50 mb-6">
      <CardContent className="p-4 sm:p-6 text-center">
        <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
        <p className="text-green-300 font-semibold text-base sm:text-lg leading-relaxed">
          {message}
        </p>
      </CardContent>
    </Card>
  );
};

export default InspirationalMessage;
