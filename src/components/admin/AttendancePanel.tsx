
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { useAttendanceData } from "./attendance/useAttendanceData";
import { useAttendanceFilters } from "./attendance/useAttendanceFilters";
import { useAttendanceActions } from "./attendance/useAttendanceActions";
import { useAttendanceExport } from "./attendance/useAttendanceExport";
import AttendanceControls from "./attendance/AttendanceControls";
import AttendanceTable from "./attendance/AttendanceTable";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

interface AttendancePanelProps {
  attendees: AttendeeData[];
}

const AttendancePanel = ({ attendees: initialAttendees }: AttendancePanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { events, activeEvent } = useEvents();

  const {
    eventAttendees,
    selectedEventId,
    setSelectedEventId,
    updateLocalStorage,
  } = useAttendanceData(activeEvent);

  const filteredAndSortedAttendees = useAttendanceFilters(
    eventAttendees,
    selectedEventId,
    searchTerm,
    sortOrder
  );

  const {
    editingId,
    editName,
    setEditName,
    deleteAttendee,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useAttendanceActions(eventAttendees, updateLocalStorage);

  const { exportToCSV, exportToPDF, getSelectedEventName } = useAttendanceExport(
    filteredAndSortedAttendees,
    selectedEventId,
    events
  );

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-blue-200/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Event-Based Attendance Records</span>
        </CardTitle>
        <CardDescription>
          Manage and export attendance data per training event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AttendanceControls
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          events={events}
          onExportCSV={exportToCSV}
          onExportPDF={exportToPDF}
        />

        <AttendanceTable
          attendees={filteredAndSortedAttendees}
          searchTerm={searchTerm}
          selectedEventId={selectedEventId}
          editingId={editingId}
          editName={editName}
          setEditName={setEditName}
          onStartEdit={startEdit}
          onSaveEdit={saveEdit}
          onCancelEdit={cancelEdit}
          onDeleteAttendee={deleteAttendee}
        />

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedAttendees.length} attendees for {getSelectedEventName()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendancePanel;
