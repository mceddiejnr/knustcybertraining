
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, Users, TrendingUp } from "lucide-react";
import ResourcePreview from "./ResourcePreview";

interface Resource {
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  previewContent: string;
  readTime?: string;
  downloads?: number;
  popularity?: 'high' | 'medium' | 'low';
}

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="group bg-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Cyber grid pattern */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg border border-green-500/30 group-hover:scale-110 transition-transform duration-300">
              {getTypeIcon(resource.type)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                {resource.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPopularityColor(resource.popularity || 'medium')}`}>
                  {resource.type}
                </span>
                {resource.popularity === 'high' && (
                  <div className="flex items-center gap-1 text-green-400">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-medium">Popular</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {resource.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-4">
            {resource.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{resource.readTime}</span>
              </div>
            )}
            {resource.downloads && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <ResourcePreview
            title={resource.title}
            description={resource.description}
            type={resource.type}
            downloadUrl={resource.downloadUrl}
            previewContent={resource.previewContent}
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 group/btn"
            onClick={() => window.open(resource.downloadUrl, '_blank')}
          >
            <Download className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
