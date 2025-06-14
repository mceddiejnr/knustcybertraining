
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckCircle } from "lucide-react";

const LearningObjectives = () => {
  const learningObjectives = [
    "Understand the fundamentals of cybersecurity and its importance in the digital workplace",
    "Identify common cyber threats including phishing, malware, and social engineering attacks",
    "Learn best practices for password security and multi-factor authentication",
    "Develop skills to recognize and respond to suspicious activities",
    "Understand KNUST's cybersecurity policies and reporting procedures",
    "Create a personal cybersecurity action plan for daily work activities"
  ];

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Target className="w-5 h-5 text-green-400" />
          <span>Learning Objectives</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {learningObjectives.map((objective, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{objective}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningObjectives;
