
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid, List, BookOpen, Shield, Code, Database } from "lucide-react";
import ResourceCard from "./ResourceCard";

const ResourcesTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const resources = [
    {
      title: "Cybersecurity Best Practices Guide",
      description: "Comprehensive guide covering essential cybersecurity practices for individuals and organizations. Learn about password management, secure browsing, and threat prevention.",
      type: "Security Guide",
      downloadUrl: "#",
      readTime: "15 min read",
      downloads: 2847,
      popularity: "high" as const,
      previewContent: `
        <h2>Introduction to Cybersecurity Best Practices</h2>
        <p>In today's digital landscape, cybersecurity is more important than ever. This comprehensive guide will walk you through the essential practices that every individual and organization should implement to protect against cyber threats.</p>
        
        <h3>1. Password Security</h3>
        <ul>
          <li><strong>Use Strong, Unique Passwords:</strong> Create passwords that are at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters.</li>
          <li><strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security to your accounts by enabling 2FA wherever possible.</li>
          <li><strong>Use a Password Manager:</strong> Tools like LastPass, 1Password, or Bitwarden can help you generate and store strong, unique passwords.</li>
        </ul>
        
        <h3>2. Safe Browsing Practices</h3>
        <ul>
          <li><strong>Verify Website URLs:</strong> Always check that you're on the correct website, especially when entering sensitive information.</li>
          <li><strong>Look for HTTPS:</strong> Ensure websites use HTTPS encryption, indicated by a lock icon in your browser's address bar.</li>
          <li><strong>Avoid Suspicious Links:</strong> Don't click on links in emails or messages from unknown sources.</li>
        </ul>
        
        <h3>3. Software Updates and Patches</h3>
        <p>Keep your operating system, applications, and security software up to date. Regular updates often include important security patches that protect against newly discovered vulnerabilities.</p>
        
        <h3>4. Data Backup and Recovery</h3>
        <p>Implement a robust backup strategy following the 3-2-1 rule: keep 3 copies of important data, store them on 2 different types of media, and keep 1 copy offsite.</p>
      `
    },
    {
      title: "Network Security Fundamentals",
      description: "Deep dive into network security concepts, protocols, and implementation strategies. Perfect for IT professionals and security enthusiasts.",
      type: "Technical Manual",
      downloadUrl: "#",
      readTime: "25 min read",
      downloads: 1923,
      popularity: "high" as const,
      previewContent: `
        <h2>Network Security Fundamentals</h2>
        <p>Network security is the practice of securing a computer network from intruders, whether targeted attackers or opportunistic malware.</p>
        
        <h3>Key Network Security Components</h3>
        <ul>
          <li><strong>Firewalls:</strong> Act as a barrier between trusted internal networks and untrusted external networks</li>
          <li><strong>Intrusion Detection Systems (IDS):</strong> Monitor network traffic for suspicious activity</li>
          <li><strong>Virtual Private Networks (VPNs):</strong> Create secure connections over public networks</li>
          <li><strong>Access Control:</strong> Manage who can access network resources</li>
        </ul>
        
        <h3>Common Network Threats</h3>
        <ul>
          <li>Malware and viruses</li>
          <li>Denial of Service (DoS) attacks</li>
          <li>Man-in-the-middle attacks</li>
          <li>SQL injection attacks</li>
        </ul>
      `
    },
    {
      title: "Incident Response Playbook",
      description: "Step-by-step guide for responding to cybersecurity incidents. Includes templates, checklists, and communication protocols.",
      type: "Playbook",
      downloadUrl: "#",
      readTime: "20 min read",
      downloads: 1456,
      popularity: "medium" as const,
      previewContent: `
        <h2>Incident Response Playbook</h2>
        <p>This playbook provides a structured approach to handling cybersecurity incidents, ensuring rapid response and minimizing damage.</p>
        
        <h3>Incident Response Phases</h3>
        <ol>
          <li><strong>Preparation:</strong> Develop and maintain an incident response capability</li>
          <li><strong>Detection & Analysis:</strong> Determine whether an incident has occurred</li>
          <li><strong>Containment:</strong> Limit the scope and magnitude of the incident</li>
          <li><strong>Eradication:</strong> Remove the cause of the incident</li>
          <li><strong>Recovery:</strong> Restore systems to normal operation</li>
          <li><strong>Lessons Learned:</strong> Document and learn from the incident</li>
        </ol>
        
        <h3>Key Stakeholders</h3>
        <ul>
          <li>Incident Response Team Leader</li>
          <li>Security Analysts</li>
          <li>IT Operations Team</li>
          <li>Legal and Compliance</li>
          <li>Communications Team</li>
        </ul>
      `
    },
    {
      title: "Privacy Protection Handbook",
      description: "Essential guide to protecting personal and organizational privacy in the digital age. Covers GDPR compliance and data protection strategies.",
      type: "Privacy Guide",
      downloadUrl: "#",
      readTime: "18 min read",
      downloads: 987,
      popularity: "medium" as const,
      previewContent: `
        <h2>Privacy Protection Handbook</h2>
        <p>In an era of increasing digital surveillance and data collection, protecting privacy has become crucial for individuals and organizations alike.</p>
        
        <h3>Personal Privacy Protection</h3>
        <ul>
          <li><strong>Social Media Privacy:</strong> Review and adjust privacy settings on all social platforms</li>
          <li><strong>Browser Privacy:</strong> Use private browsing modes and privacy-focused browsers</li>
          <li><strong>Mobile Device Security:</strong> Secure your smartphones and tablets with strong authentication</li>
        </ul>
        
        <h3>Organizational Privacy Compliance</h3>
        <ul>
          <li>GDPR compliance requirements</li>
          <li>Data minimization principles</li>
          <li>Privacy by design implementation</li>
          <li>Data breach notification procedures</li>
        </ul>
      `
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || resource.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: "all", label: "All Resources", icon: BookOpen },
    { value: "security", label: "Security Guides", icon: Shield },
    { value: "technical", label: "Technical Manuals", icon: Code },
    { value: "playbook", label: "Playbooks", icon: Database },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Cybersecurity Resources
            </h2>
            <p className="text-gray-300 text-base lg:text-lg">
              Access comprehensive guides, tools, and materials to enhance your cybersecurity knowledge
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' 
                ? "bg-green-600 text-white" 
                : "bg-gray-700/50 border-green-500/30 text-green-400 hover:bg-gray-600"
              }
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' 
                ? "bg-green-600 text-white" 
                : "bg-gray-700/50 border-green-500/30 text-green-400 hover:bg-gray-600"
              }
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-4 border border-green-500/10">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/30"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={filterType === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(option.value)}
                  className={filterType === option.value
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-700/50 border-green-500/30 text-green-400 hover:bg-gray-600 hover:border-green-400"
                  }
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.label.split(' ')[0]}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredResources.map((resource, index) => (
          <ResourceCard key={index} resource={resource} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-xl p-8 border border-green-500/10">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No resources found matching your criteria.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search terms or filters.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesTab;
