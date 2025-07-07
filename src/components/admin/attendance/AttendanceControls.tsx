
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, ArrowUpDown } from "lucide-react";
import { Event } from "@/hooks/useEvents";

interface AttendanceControlsProps {
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  events: Event[];
  onExportCSV: () => void;
  onExportPDF: () => void;
}

const AttendanceControls = ({
  selectedEventId,
  setSelectedEventId,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  events,
  onExportCSV,
  onExportPDF,
}: AttendanceControlsProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Select value={selectedEventId} onValueChange={setSelectedEventId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} {event.is_active && "(Active)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Input
            placeholder="Search attendees or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <ArrowUpDown className="w-4 h-4" />
          <span>Sort by Time</span>
        </Button>
        <Button
          onClick={onExportCSV}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>CSV</span>
        </Button>
        <Button
          onClick={onExportPDF}
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default AttendanceControls;
