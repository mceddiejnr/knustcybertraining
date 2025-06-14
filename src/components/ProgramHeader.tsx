
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Award } from "lucide-react";

const ProgramHeader = () => {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <img 
          src="/lovable-uploads/edb649cb-0092-4609-a197-946f2fe735de.png" 
          alt="KNUST Logo" 
          className="h-12 sm:h-16 w-auto drop-shadow-lg"
        />
        <div className="text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
            CYBERSECURITY TRAINING
          </h1>
          <p className="text-green-400 font-mono text-sm sm:text-base">Organized by Library & UITS, KNUST</p>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">Tuesday, 3rd June 2025</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">10:00 AM – 12:00 PM</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">Library Mall Conference Room</p>
          </CardContent>
        </Card>
      </div>

      {/* Theme */}
      <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-6 h-6 text-green-400 mr-2" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Training Theme</h2>
          </div>
          <p className="text-green-400 font-semibold text-base sm:text-lg">
            "Cybersecurity Essentials: Staying Safe in a Digital Workplace"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramHeader;
