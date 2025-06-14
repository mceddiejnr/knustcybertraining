
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Shield, Target, Users } from "lucide-react";

const KeyTopics = () => {
  const keyTopics = [
    { icon: Shield, title: "Threat Awareness", description: "Understanding current cybersecurity threats and attack vectors" },
    { icon: Target, title: "Risk Assessment", description: "Identifying vulnerabilities in personal and professional environments" },
    { icon: Lightbulb, title: "Best Practices", description: "Implementing security measures and protective strategies" },
    { icon: Users, title: "Incident Response", description: "Proper procedures for reporting and handling security incidents" }
  ];

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-white">
          <Lightbulb className="w-5 h-5 text-green-400" />
          <span>Key Topics Covered</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-3 mb-2">
                <topic.icon className="w-5 h-5 text-green-400" />
                <h3 className="text-white font-semibold">{topic.title}</h3>
              </div>
              <p className="text-gray-300 text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyTopics;
