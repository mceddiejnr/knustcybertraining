
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

interface AttendeeData {
  name: string;
  timestamp: string;
  id: number;
}

interface AttendancePanelProps {
  attendees: AttendeeData[];
}

const AttendancePanel = ({ attendees }: AttendancePanelProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filteredAndSortedAttendees = attendees
    .filter(attendee => 
      attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return sortOrder === "desc" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  const exportToCSV = () => {
    const headers = ["Name", "Timestamp"];
    const csvContent = [
      headers.join(","),
      ...filteredAndSortedAttendees.map(attendee => 
        `"${attendee.name}","${format(new Date(attendee.timestamp), "yyyy-MM-dd HH:mm:ss")}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // Simple PDF export simulation
    const printContent = `
      KNUST Cybersecurity Training - Attendance Report
      Generated on: ${format(new Date(), "PPP")}
      
      ${filteredAndSortedAttendees.map(attendee => 
        `${attendee.name} - ${format(new Date(attendee.timestamp), "PPP p")}`
      ).join("\n")}
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Attendance Report</title></head>
          <body style="font-family: Arial, sans-serif; padding: 20px;">
            <pre>${printContent}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm border-blue-200/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-600" />
          <span>Attendance Records</span>
        </CardTitle>
        <CardDescription>
          Manage and export attendance data for the cybersecurity training session
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search attendees by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
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
              onClick={exportToCSV}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>CSV</span>
            </Button>
            <Button
              onClick={exportToPDF}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedAttendees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    {searchTerm ? "No attendees found matching your search." : "No attendees registered yet."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedAttendees.map((attendee) => (
                  <TableRow key={attendee.id}>
                    <TableCell className="font-medium">{attendee.name}</TableCell>
                    <TableCell>{format(new Date(attendee.timestamp), "MMM dd, yyyy")}</TableCell>
                    <TableCell>{format(new Date(attendee.timestamp), "h:mm a")}</TableCell>
                    <TableCell className="text-right">{attendee.id}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAndSortedAttendees.length} of {attendees.length} attendees
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendancePanel;
