
interface EventAttendeeData {
  name: string;
  timestamp: string;
  id: number;
  eventId: string;
  eventName: string;
}

export const useAttendanceFilters = (
  eventAttendees: EventAttendeeData[],
  selectedEventId: string,
  searchTerm: string,
  sortOrder: "asc" | "desc"
) => {
  const getFilteredAttendees = () => {
    let filteredData = eventAttendees;

    // Filter by event
    if (selectedEventId !== "all") {
      filteredData = filteredData.filter(attendee => attendee.eventId === selectedEventId);
    }

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter(attendee => 
        attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendee.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by timestamp
    return filteredData.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });
  };

  return getFilteredAttendees();
};
