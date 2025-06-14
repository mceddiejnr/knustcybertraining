
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, FileText, Download, Share2, Bookmark, Star } from "lucide-react";

interface ResourcePreviewProps {
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  previewContent: string;
}

const ResourcePreview = ({ title, description, type, downloadUrl, previewContent }: ResourcePreviewProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-700/50 border-green-500/30 text-green-400 hover:bg-gray-600 hover:border-green-400 transition-all duration-300 backdrop-blur-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] max-h-[95vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-green-500/20 shadow-2xl backdrop-blur-xl overflow-hidden">
        <DialogHeader className="border-b border-green-500/20 pb-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-t-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl lg:text-2xl font-bold text-white mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                {title}
              </DialogTitle>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">{description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-gradient-to-r from-green-600/20 to-blue-600/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                  {type}
                </span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 cursor-pointer transition-colors ${
                        star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`transition-all duration-300 ${
                  isBookmarked 
                    ? 'bg-yellow-600/20 border-yellow-500/50 text-yellow-400' 
                    : 'bg-gray-700/50 border-gray-500/30 text-gray-400 hover:border-yellow-500/50'
                }`}
              >
                <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:border-blue-400 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300"
                onClick={() => window.open(downloadUrl, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-lg border border-green-500/10 m-2">
          <div className="h-full overflow-auto custom-scrollbar p-6 lg:p-8">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200/50 min-h-full">
              <div className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/50">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg shadow-lg">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Document Preview</h3>
                    <p className="text-sm text-gray-600">Professional cybersecurity training material</p>
                  </div>
                </div>
                
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed space-y-4" 
                       dangerouslySetInnerHTML={{ __html: previewContent }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(34, 197, 94, 0.1);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #10b981, #059669);
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #059669, #047857);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ResourcePreview;
