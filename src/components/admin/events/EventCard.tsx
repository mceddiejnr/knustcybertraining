
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Power, PowerOff, Edit, Trash2 } from "lucide-react";
import { Event } from "@/hooks/useEvents";
import EventFormDialog from "./EventFormDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface EventCardProps {
  event: Event;
  isEditing: boolean;
  onStartEditing: (eventId: string) => void;
  onStopEditing: () => void;
  onActivate: (eventId: string) => void;
  onDelete: (eventId: string) => void;
}

const EventCard = ({ 
  event, 
  isEditing, 
  onStartEditing, 
  onStopEditing, 
  onActivate, 
  onDelete 
}: EventCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return null;
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      <div className={`bg-gray-700/50 rounded-lg p-4 border ${
        event.is_active ? 'border-green-500/50 bg-green-900/20' : 'border-gray-600'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-white text-lg">{event.name}</h3>
              {event.is_active && (
                <Badge className="bg-green-600 text-white">
                  <Power className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              )}
            </div>
            
            {event.description && (
              <p className="text-gray-300 text-sm mb-2">{event.description}</p>
            )}
            
            {event.theme && (
              <p className="text-green-400 text-sm font-medium mb-3">
                Theme: {event.theme}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              {event.date && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
              )}
              
              {(event.start_time || event.end_time) && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatTime(event.start_time)} - {formatTime(event.end_time)}
                  </span>
                </div>
              )}
              
              {event.location && (
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          {!event.is_active && (
            <Button
              onClick={() => onActivate(event.id)}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-xs"
            >
              <Power className="w-3 h-3 mr-1" />
              Activate
            </Button>
          )}
          
          <Button
            onClick={() => setEditDialogOpen(true)}
            variant="outline"
            size="sm"
            className="text-xs border-gray-500 text-gray-400"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-red-500/50 text-red-400 hover:bg-red-900/20"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-red-500/30">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Delete Event</AlertDialogTitle>
                <AlertDialogDescription className="text-gray-300">
                  Are you sure you want to delete "{event.name}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-500 text-gray-400">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete(event.id)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <EventFormDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        event={event}
      />
    </>
  );
};

export default EventCard;
