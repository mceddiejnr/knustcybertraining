
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Settings, Power, PowerOff, Edit, Trash2 } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import EventFormDialog from "./events/EventFormDialog";
import EventCard from "./events/EventCard";
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
} from "@/components/ui/dialog";

const EventManager = () => {
  const { events, activeEvent, loading, activateEvent, deleteEvent } = useEvents();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);

  const handleActivateEvent = async (eventId: string) => {
    await activateEvent(eventId);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  const handleStartEditing = (eventId: string) => {
    setEditingEvent(eventId);
  };

  const handleStopEditing = () => {
    setEditingEvent(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-green-300 border-t-green-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <Card className="bg-gray-800/95 backdrop-blur-sm border-green-500/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2 text-white">
            <Calendar className="w-5 h-5 text-green-400" />
            <span>Event Management ({events.length})</span>
          </CardTitle>
          <Button
            onClick={() => setCreateDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeEvent && (
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Power className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-semibold text-sm">ACTIVE EVENT</span>
            </div>
            <h3 className="text-white font-bold text-lg">{activeEvent.name}</h3>
            {activeEvent.description && (
              <p className="text-gray-300 text-sm">{activeEvent.description}</p>
            )}
            {activeEvent.theme && (
              <p className="text-green-400 text-sm font-medium mt-1">Theme: {activeEvent.theme}</p>
            )}
          </div>
        )}

        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No events created yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                isEditing={editingEvent === event.id}
                onStartEditing={handleStartEditing}
                onStopEditing={handleStopEditing}
                onActivate={handleActivateEvent}
                onDelete={handleDeleteEvent}
              />
            ))}
          </div>
        )}

        <EventFormDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
      </CardContent>
    </Card>
  );
};

export default EventManager;
