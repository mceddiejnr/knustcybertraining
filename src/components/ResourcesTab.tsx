import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Book, Folder, Link, Video, Globe, Star, BookOpen, Eye } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: "cheatsheet" | "toolkit" | "slides" | "link" | "video" | "interactive";
  description: string;
  filename?: string;
  url?: string;
  rating?: number;
  downloads?: number;
}

const ResourcesTab = () => {
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  const resources: Resource[] = [
    {
      id: "1",
      title: "Top 10 Password Tips",
      type: "cheatsheet",
      description: "Essential password security guidelines and best practices for creating strong passwords",
      filename: "password-tips-cheatsheet.pdf",
      rating: 4.8,
      downloads: 1250
    },
    {
      id: "2",
      title: "Phishing Detection Guide",
      type: "cheatsheet",
      description: "Comprehensive guide to identify and avoid phishing attacks with real examples",
      filename: "phishing-detection-guide.pdf",
      rating: 4.9,
      downloads: 980
    },
    {
      id: "3",
      title: "Kali Linux Toolkit",
      type: "toolkit",
      description: "Complete guide to cybersecurity tools and penetration testing techniques",
      filename: "kali-linux-toolkit.pdf",
      rating: 4.7,
      downloads: 750
    },
    {
      id: "4",
      title: "Cybersecurity Workshop Slides",
      type: "slides",
      description: "Complete presentation materials from today's training session",
      filename: "cybersecurity-workshop-slides.pdf",
      rating: 4.6,
      downloads: 1500
    },
    {
      id: "5",
      title: "Social Engineering Defense",
      type: "cheatsheet",
      description: "Protect yourself from social engineering attacks and manipulation tactics",
      filename: "social-engineering-defense.pdf",
      rating: 4.8,
      downloads: 890
    },
    {
      id: "6",
      title: "Network Security Toolkit",
      type: "toolkit",
      description: "Tools and techniques for network security assessment and monitoring",
      filename: "network-security-toolkit.pdf",
      rating: 4.5,
      downloads: 650
    },
    {
      id: "7",
      title: "KNUST Cybersecurity Policies",
      type: "slides",
      description: "Official university cybersecurity policies and compliance guidelines",
      filename: "knust-cybersecurity-policies.pdf",
      rating: 4.4,
      downloads: 1100
    },
    {
      id: "8",
      title: "Incident Response Playbook",
      type: "toolkit",
      description: "Step-by-step guide for responding to cybersecurity incidents",
      filename: "incident-response-playbook.pdf",
      rating: 4.9,
      downloads: 720
    },
    {
      id: "9",
      title: "NIST Cybersecurity Framework",
      type: "link",
      description: "Official NIST framework for improving critical infrastructure cybersecurity",
      url: "https://www.nist.gov/cyberframework",
      rating: 4.9,
      downloads: 0
    },
    {
      id: "10",
      title: "Have I Been Pwned",
      type: "link",
      description: "Check if your email has been compromised in data breaches",
      url: "https://haveibeenpwned.com",
      rating: 4.8,
      downloads: 0
    },
    {
      id: "11",
      title: "Password Strength Checker",
      type: "interactive",
      description: "Interactive tool to test and improve your password strength",
      url: "https://www.security.org/how-secure-is-my-password/",
      rating: 4.6,
      downloads: 0
    },
    {
      id: "12",
      title: "Cybersecurity Awareness Video Series",
      type: "video",
      description: "Educational video series covering essential cybersecurity topics",
      url: "https://www.youtube.com/playlist?list=PLBf0hzazHTGOh9SVcGwG3pOdEB9B26Nys",
      rating: 4.7,
      downloads: 0
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
      case "link":
        return <Link className="w-5 h-5 text-orange-400" />;
      case "video":
        return <Video className="w-5 h-5 text-red-400" />;
      case "interactive":
        return <Globe className="w-5 h-5 text-cyan-400" />;
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
      case "link":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "video":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "interactive":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getButtonColor = (type: string) => {
    switch (type) {
      case "cheatsheet":
        return "bg-green-600 hover:bg-green-700";
      case "toolkit":
        return "bg-blue-600 hover:bg-blue-700";
      case "slides":
        return "bg-purple-600 hover:bg-purple-700";
      case "link":
        return "bg-orange-600 hover:bg-orange-700";
      case "video":
        return "bg-red-600 hover:bg-red-700";
      case "interactive":
        return "bg-cyan-600 hover:bg-cyan-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const handleDownload = (resource: Resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.filename) {
      // Simulate download
      console.log(`Downloading ${resource.filename}`);
      
      const content = `${resource.title}\n\nThis is a placeholder for the actual PDF resource.\nIn a real implementation, this would be the actual PDF content.\n\nDescription: ${resource.description}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      // Update download count
      setDownloadCounts(prev => ({
        ...prev,
        [resource.id]: (prev[resource.id] || 0) + 1
      }));
    }
  };

  const handleView = (resource: Resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.filename) {
      // Create a preview content for the file
      const content = `
        <html>
          <head>
            <title>${resource.title} - Preview</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
              .header { background: #1f2937; color: white; padding: 20px; margin: -40px -40px 40px -40px; }
              .content { max-width: 800px; }
              .description { color: #666; font-style: italic; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${resource.title}</h1>
              <p>Resource Preview</p>
            </div>
            <div class="content">
              <p class="description">${resource.description}</p>
              <h2>About This Resource</h2>
              <p>This is a preview of the <strong>${resource.title}</strong> resource.</p>
              <p>In a real implementation, this would display the actual PDF content or document preview.</p>
              <h3>Key Features:</h3>
              <ul>
                <li>Comprehensive coverage of ${resource.type} topics</li>
                <li>Practical examples and guidelines</li>
                <li>Professional formatting and design</li>
                <li>Easy to follow structure</li>
              </ul>
              <p><em>To get the full content, please download the complete ${resource.filename} file.</em></p>
            </div>
          </body>
        </html>
      `;
      
      const blob = new Blob([content], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
      
      // Clean up the URL after a delay
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 1000);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
      />
    ));
  };

  const resourcesByType = {
    cheatsheet: resources.filter(r => r.type === "cheatsheet"),
    toolkit: resources.filter(r => r.type === "toolkit"),
    slides: resources.filter(r => r.type === "slides"),
    link: resources.filter(r => r.type === "link"),
    video: resources.filter(r => r.type === "video"),
    interactive: resources.filter(r => r.type === "interactive")
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 hover:border-green-400/50 transition-all duration-200">
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
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            {renderStars(resource.rating || 0)}
            <span className="text-gray-400 text-xs ml-1">({resource.rating})</span>
          </div>
          <span className="text-gray-500 text-xs">
            {resource.downloads ? `${resource.downloads + (downloadCounts[resource.id] || 0)} downloads` : 'External'}
          </span>
        </div>

        <div className="flex gap-2">
          {(resource.filename || resource.url) && (
            <Button 
              onClick={() => handleView(resource)}
              size="sm" 
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          )}
          
          <Button 
            onClick={() => handleDownload(resource)}
            size="sm" 
            className={`flex-1 text-white ${getButtonColor(resource.type)}`}
          >
            {resource.type === 'link' || resource.type === 'video' || resource.type === 'interactive' ? (
              <>
                <Link className="w-4 h-4 mr-2" />
                Open Link
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Training Resources</h2>
        <p className="text-gray-400">Download cheatsheets, toolkits, access online tools, and explore additional learning materials</p>
      </div>

      {/* Cheatsheets Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Quick Reference Cheatsheets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.cheatsheet.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Toolkits Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
          <Folder className="w-5 h-5 mr-2" />
          Comprehensive Toolkits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.toolkit.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Workshop Materials Section */}
      <div>
        <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2" />
          Workshop Materials & Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.slides.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Online Resources Section */}
      <div>
        <h3 className="text-lg font-semibold text-orange-400 mb-4 flex items-center">
          <Link className="w-5 h-5 mr-2" />
          Essential Online Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.link.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Interactive Tools Section */}
      <div>
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Interactive Security Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.interactive.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Video Content Section */}
      <div>
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
          <Video className="w-5 h-5 mr-2" />
          Educational Videos
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourcesByType.video.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>

      {/* Additional Resources Info */}
      <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-blue-400/50">
        <CardContent className="p-6 text-center">
          <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Need More Resources?</h3>
          <p className="text-gray-300 mb-4">
            Looking for specific cybersecurity resources or have questions about any of these materials? 
            Contact the KNUST UITS team for additional support and personalized recommendations.
          </p>
          <Button 
            onClick={() => window.open('mailto:uits@knust.edu.gh', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Contact UITS Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
