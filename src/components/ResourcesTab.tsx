
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Folder } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: "cheatsheet" | "toolkit" | "slides";
  description: string;
  filename: string;
}

const ResourcesTab = () => {
  const resources: Resource[] = [
    {
      id: "1",
      title: "Top 10 Password Tips",
      type: "cheatsheet",
      description: "Essential password security guidelines and best practices",
      filename: "password-tips-cheatsheet.pdf"
    },
    {
      id: "2",
      title: "Phishing Detection Guide",
      type: "cheatsheet",
      description: "How to identify and avoid phishing attacks",
      filename: "phishing-detection-guide.pdf"
    },
    {
      id: "3",
      title: "Kali Linux Toolkit",
      type: "toolkit",
      description: "Complete guide to cybersecurity tools and techniques",
      filename: "kali-linux-toolkit.pdf"
    },
    {
      id: "4",
      title: "Cybersecurity Workshop Slides",
      type: "slides",
      description: "Complete presentation materials from today's training",
      filename: "cybersecurity-workshop-slides.pdf"
    },
    {
      id: "5",
      title: "Social Engineering Defense",
      type: "cheatsheet",
      description: "Protect yourself from social engineering attacks",
      filename: "social-engineering-defense.pdf"
    },
    {
      id: "6",
      title: "Network Security Toolkit",
      type: "toolkit",
      description: "Tools and techniques for network security assessment",
      filename: "network-security-toolkit.pdf"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "cheatsheet":
        return <FileText className="w-5 h-5 text-green-400" />;
      case "toolkit":
        return <Folder className="w-5 h-5 text-blue-400" />;
      case "slides":
        return <Book className="w-5 h-5 text-purple-400" />;
      default:
        return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cheatsheet":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "toolkit":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "slides":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleDownload = (filename: string, title: string) => {
    // Simulate download (in real app, this would download actual PDFs)
    console.log(`Downloading ${filename}`);
    
    // Create a simple text file as placeholder for demonstration
    const content = `${title}\n\nThis is a placeholder for the actual PDF resource.\nIn a real implementation, this would be the actual PDF content.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resourcesByType = {
    cheatsheet: resources.filter(r => r.type === "cheatsheet"),
    toolkit: resources.filter(r => r.type === "toolkit"),
    slides: resources.filter(r => r.type === "slides")
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Training Resources</h2>
        <p className="text-gray-400">Download cheatsheets, toolkits, and workshop materials</p>
      </div>

      {/* Cheatsheets Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Cheatsheets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourcesByType.cheatsheet.map((resource) => (
            <Card key={resource.id} className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white flex items-center justify-between">
                  <div className="flex items-center">
                    {getIcon(resource.type)}
                    <span className="ml-2">{resource.title}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                <Button 
                  onClick={() => handleDownload(resource.filename, resource.title)}
                  size="sm" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Toolkits Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2" />
          Toolkits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourcesByType.toolkit.map((resource) => (
            <Card key={resource.id} className="bg-gray-800/95 backdrop-blur-sm border-blue-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white flex items-center justify-between">
                  <div className="flex items-center">
                    {getIcon(resource.type)}
                    <span className="ml-2">{resource.title}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                <Button 
                  onClick={() => handleDownload(resource.filename, resource.title)}
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Workshop Slides Section */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2" />
          Workshop Materials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resourcesByType.slides.map((resource) => (
            <Card key={resource.id} className="bg-gray-800/95 backdrop-blur-sm border-purple-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white flex items-center justify-between">
                  <div className="flex items-center">
                    {getIcon(resource.type)}
                    <span className="ml-2">{resource.title}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(resource.type)}`}>
                    {resource.type}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-400 text-sm mb-3">{resource.description}</p>
                <Button 
                  onClick={() => handleDownload(resource.filename, resource.title)}
                  size="sm" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourcesTab;
