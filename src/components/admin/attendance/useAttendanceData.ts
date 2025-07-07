
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

  const loadEventAttendance = () => {
    const eventAttendanceData = JSON.parse(localStorage.getItem("eventAttendance") || "[]");
    setEventAttendees(eventAttendanceData);
    
    // Set default selected event to active event
    if (activeEvent && selectedEventId === "all") {
      setSelectedEventId(activeEvent.id);
    }
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
