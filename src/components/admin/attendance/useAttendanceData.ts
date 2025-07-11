
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
    console.log('Loading event attendance data...');
    
    // Try to load from different possible localStorage keys
    let eventAttendanceData = JSON.parse(localStorage.getItem("eventAttendance") || "[]");
    
    // If eventAttendance is empty, try to migrate from regular attendees
    if (eventAttendanceData.length === 0) {
      const regularAttendees = JSON.parse(localStorage.getItem("attendees") || "[]");
      console.log('Regular attendees found:', regularAttendees);
      
      // Convert regular attendees to event-based format if activeEvent exists
      if (regularAttendees.length > 0) {
        eventAttendanceData = regularAttendees.map((attendee: any, index: number) => ({
          ...attendee,
          eventId: "legacy", // Mark as legacy data
          eventName: "Legacy Event",
          id: attendee.id || Date.now() + index
        }));
        
        // Save the converted data
        localStorage.setItem("eventAttendance", JSON.stringify(eventAttendanceData));
        console.log('Converted legacy attendance data:', eventAttendanceData);
      }
    }
    
    console.log('Event attendance data loaded:', eventAttendanceData);
    setEventAttendees(eventAttendanceData);
  };

  const updateLocalStorage = (updatedAttendees: EventAttendeeData[]) => {
    console.log('Updating event attendance data:', updatedAttendees);
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
