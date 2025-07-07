
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Award } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { useEffect } from "react";

const ProgramHeader = () => {
  const { activeEvent, loadEvents } = useEvents();

  // Reload events when component mounts to ensure we have the latest data
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (startTime: string | null, endTime: string | null) => {
    if (!startTime || !endTime) return "TBA";
    const start = new Date(`2000-01-01T${startTime}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const end = new Date(`2000-01-01T${endTime}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return `${start} – ${end}`;
  };

  console.log('ProgramHeader activeEvent:', activeEvent);

  // If no active event, show default content
  if (!activeEvent) {
    return (
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <img 
            src="/lovable-uploads/d6c770ee-3058-4298-a368-19c14cead8a0.png" 
            alt="KNUST Logo" 
            className="h-12 sm:h-16 w-auto drop-shadow-lg"
          />
          <div className="text-left">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
              TRAINING PROGRAM
            </h1>
            <p className="text-green-400 font-mono text-sm sm:text-base">
              Organized by Library & UITS, KNUST
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="flex justify-center items-center space-x-4 mb-4">
        <img 
          src="/lovable-uploads/d6c770ee-3058-4298-a368-19c14cead8a0.png" 
          alt="KNUST Logo" 
          className="h-12 sm:h-16 w-auto drop-shadow-lg"
        />
        <div className="text-left">
          <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-wide">
            {activeEvent.name}
          </h1>
          <p className="text-green-400 font-mono text-sm sm:text-base">
            {activeEvent.description || 'Organized by Library & UITS, KNUST'}
          </p>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">
              {formatDate(activeEvent.date)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">
              {formatTime(activeEvent.start_time, activeEvent.end_time)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
          <CardContent className="p-3 sm:p-4 text-center">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-semibold text-sm sm:text-base">
              {activeEvent.location || 'TBA'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Theme */}
      {activeEvent.theme && (
        <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-green-400 mr-2" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Training Theme</h2>
            </div>
            <p className="text-green-400 font-semibold text-base sm:text-lg">
              "{activeEvent.theme}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProgramHeader;
