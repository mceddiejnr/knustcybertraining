
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Save, X } from "lucide-react";
import { format } from "date-fns";

interface EventAttendeeData {
  name: string;
  timestamp: string;
  id: number;
  eventId: string;
  eventName: string;
}

interface AttendanceTableProps {
  attendees: EventAttendeeData[];
  searchTerm: string;
  selectedEventId: string;
  editingId: number | null;
  editName: string;
  setEditName: (name: string) => void;
  onStartEdit: (attendee: EventAttendeeData) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onDeleteAttendee: (id: number) => void;
}

const AttendanceTable = ({
  attendees,
  searchTerm,
  selectedEventId,
  editingId,
  editName,
  setEditName,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteAttendee,
}: AttendanceTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">ID</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                {searchTerm || selectedEventId !== "all" ? "No attendees found matching your criteria." : "No attendees registered yet."}
              </TableCell>
            </TableRow>
          ) : (
            attendees.map((attendee) => (
              <TableRow key={attendee.id}>
                <TableCell className="font-medium">
                  {editingId === attendee.id ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') onSaveEdit(attendee.id);
                          if (e.key === 'Escape') onCancelEdit();
                        }}
                      />
                      <Button onClick={() => onSaveEdit(attendee.id)} size="sm" variant="outline">
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button onClick={onCancelEdit} size="sm" variant="outline">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    attendee.name
                  )}
                </TableCell>
                <TableCell className="text-sm text-blue-600 font-medium">{attendee.eventName}</TableCell>
                <TableCell>{format(new Date(attendee.timestamp), "MMM dd, yyyy")}</TableCell>
                <TableCell>{format(new Date(attendee.timestamp), "h:mm a")}</TableCell>
                <TableCell className="text-right">{attendee.id}</TableCell>
                <TableCell className="text-right">
                  {editingId === attendee.id ? null : (
                    <div className="flex justify-end space-x-2">
                      <Button onClick={() => onStartEdit(attendee)} variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => onDeleteAttendee(attendee.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
