
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EventAttendeeData {
  name: string;
  timestamp: string;
  id: number;
  eventId: string;
  eventName: string;
}

export const useAttendanceActions = (
  eventAttendees: EventAttendeeData[],
  updateLocalStorage: (attendees: EventAttendeeData[]) => void
) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

  const deleteAttendee = (id: number) => {
    const updatedAttendees = eventAttendees.filter(attendee => attendee.id !== id);
    updateLocalStorage(updatedAttendees);
    toast({
      title: "Attendee deleted",
      description: "The attendee record has been removed successfully.",
    });
  };

  const startEdit = (attendee: EventAttendeeData) => {
    setEditingId(attendee.id);
    setEditName(attendee.name);
  };

  const saveEdit = (id: number) => {
    if (!editName.trim()) {
      toast({
        title: "Invalid name",
        description: "Name cannot be empty.",
        variant: "destructive"
      });
      return;
    }

    const updatedAttendees = eventAttendees.map(attendee =>
      attendee.id === id ? { ...attendee, name: editName.trim() } : attendee
    );
    updateLocalStorage(updatedAttendees);
    setEditingId(null);
    setEditName("");
    toast({
      title: "Attendee updated",
      description: "The attendee record has been updated successfully.",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return {
    editingId,
    editName,
    setEditName,
    deleteAttendee,
    startEdit,
    saveEdit,
    cancelEdit,
  };
};
