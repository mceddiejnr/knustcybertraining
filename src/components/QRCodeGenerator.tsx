
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { useEvents } from "@/hooks/useEvents";

interface QRCodeGeneratorProps {
  onCodeGenerated?: (code: string) => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ onCodeGenerated }) => {
  const [accessCode, setAccessCode] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { activeEvent } = useEvents();

  const generateAccessCode = async () => {
    const newCode = uuidv4().slice(0, 8).toUpperCase();
    setAccessCode(newCode);
    
    try {
      const { error } = await supabase
        .from('attendees')
        .insert([
          { 
            access_code: newCode,
            name: `Guest-${newCode}`,
            timestamp: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error saving access code:', error);
        toast.error('Failed to generate access code');
        return;
      }

      toast.success('Access code generated successfully!');
      if (onCodeGenerated) {
        onCodeGenerated(newCode);
      }
    } catch (error) {
      console.error('Error generating access code:', error);
      toast.error('Failed to generate access code');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accessCode);
    setCopied(true);
    toast.success('Access code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generateAccessCode();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-gray-900/95 backdrop-blur-sm border-green-500/50 shadow-2xl">
        <CardContent className="p-6 text-center">
          <div className="mb-6">
            <QrCode className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
              {activeEvent?.name || 'TRAINING PROGRAM'}
            </h1>
            <p className="text-green-400 text-sm mb-4">
              {activeEvent?.description || 'Organized by Library & UITS, KNUST'}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-green-500/30">
            <p className="text-gray-300 text-sm mb-2">Your Access Code:</p>
            <div className="text-2xl font-mono font-bold text-green-400 mb-3 tracking-wider">
              {accessCode}
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="text-green-400 border-green-500/50 hover:bg-green-500/10"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>

          <Button
            onClick={generateAccessCode}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Generate New Code
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeGenerator;
