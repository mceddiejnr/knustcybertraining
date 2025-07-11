
import { useState, useEffect } from "react";

interface EventAttendeeData {
  name: string;
  timestamp: string;
  id: number;
  eventId: string;
  eventName: string;
}

export const useAttendanceData = (activeEvent: any) => {
  const [eventAttendees, setEventAttendees] = useState<EventAttendeeData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>("all");

  useEffect(() => {
    loadEventAttendance();
  }, []);

  // Auto-select active event when it becomes available
  useEffect(() => {
    if (activeEvent && activeEvent.id) {
      setSelectedEventId(activeEvent.id);
    }
  }, [activeEvent]);

  const loadEventAttendance = () => {
    const eventAttendanceData = JSON.parse(localStorage.getItem("eventAttendance") || "[]");
    setEventAttendees(eventAttendanceData);
  };

  const updateLocalStorage = (updatedAttendees: EventAttendeeData[]) => {
    localStorage.setItem("eventAttendance", JSON.stringify(updatedAttendees));
    setEventAttendees(updatedAttendees);
  };

  return {
    eventAttendees,
    selectedEventId,
    setSelectedEventId,
    updateLocalStorage,
    loadEventAttendance,
  };
};
