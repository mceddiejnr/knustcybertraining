
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
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      const currentDate = format(new Date(), "PPP");
      const currentTime = format(new Date(), "p");
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>KNUST Cybersecurity Training - Attendance Report</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: #333;
                line-height: 1.6;
                margin: 0;
                padding: 20px;
              }
              
              .container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              }
              
              .header {
                background: linear-gradient(135deg, #0f3460 0%, #16537e 100%);
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }
              
              .header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="rgba(34,197,94,0.1)"/><path d="M2 2L18 2M2 2L2 18" stroke="rgba(34,197,94,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23circuit)"/></svg>') repeat;
                opacity: 0.1;
              }
              
              .header-content {
                position: relative;
                z-index: 1;
              }
              
              .logo {
                width: 60px;
                height: 60px;
                margin: 0 auto 15px;
                background: rgba(34,197,94,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid #22c55e;
              }
              
              .logo::before {
                content: '🛡️';
                font-size: 24px;
              }
              
              .header h1 {
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 8px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
              }
              
              .header h2 {
                font-size: 18px;
                font-weight: normal;
                color: #22c55e;
                margin-bottom: 15px;
              }
              
              .report-info {
                background: rgba(255,255,255,0.1);
                padding: 15px;
                border-radius: 8px;
                margin-top: 15px;
                backdrop-filter: blur(10px);
              }
              
              .content {
                padding: 30px;
              }
              
              .summary {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin-bottom: 30px;
              }
              
              .summary-card {
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                border: 1px solid #e2e8f0;
              }
              
              .summary-card h3 {
                color: #0f3460;
                font-size: 14px;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              
              .summary-card .number {
                font-size: 24px;
                font-weight: bold;
                color: #22c55e;
              }
              
              .table-container {
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                background: white;
              }
              
              th {
                background: linear-gradient(135deg, #0f3460 0%, #16537e 100%);
                color: white;
                padding: 15px 20px;
                text-align: left;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-size: 12px;
              }
              
              td {
                padding: 12px 20px;
                border-bottom: 1px solid #f1f5f9;
                font-size: 14px;
              }
              
              tr:nth-child(even) {
                background: #f8fafc;
              }
              
              tr:hover {
                background: #e2e8f0;
              }
              
              .id-cell {
                text-align: center;
                font-weight: bold;
                color: #0f3460;
              }
              
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #64748b;
                font-size: 12px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
              }
              
              .footer-logo {
                margin-bottom: 10px;
                color: #0f3460;
                font-weight: bold;
              }
              
              @media print {
                body {
                  background: white;
                  padding: 0;
                }
                
                .container {
                  box-shadow: none;
                  border-radius: 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-content">
                  <div class="logo"></div>
                  <h1>KNUST CYBERSECURITY TRAINING</h1>
                  <h2>Attendance Report</h2>
                  <div class="report-info">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <div>
                        <strong>Report Generated:</strong><br>
                        ${currentDate} at ${currentTime}
                      </div>
                      <div style="text-align: right;">
                        <strong>Total Attendees:</strong><br>
                        ${filteredAndSortedAttendees.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="content">
                <div class="summary">
                  <div class="summary-card">
                    <h3>Total Registered</h3>
                    <div class="number">${filteredAndSortedAttendees.length}</div>
                  </div>
                  <div class="summary-card">
                    <h3>Session Date</h3>
                    <div class="number" style="font-size: 16px;">${format(new Date(), "MMM dd")}</div>
                  </div>
                  <div class="summary-card">
                    <h3>Status</h3>
                    <div class="number" style="font-size: 16px; color: #22c55e;">Active</div>
                  </div>
                </div>
                
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Participant ID</th>
                        <th>Full Name</th>
                        <th>Registration Date</th>
                        <th>Registration Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${filteredAndSortedAttendees.map((attendee, index) => `
                        <tr>
                          <td class="id-cell">#${String(index + 1).padStart(3, '0')}</td>
                          <td style="font-weight: 600;">${attendee.name}</td>
                          <td>${format(new Date(attendee.timestamp), "MMM dd, yyyy")}</td>
                          <td>${format(new Date(attendee.timestamp), "h:mm a")}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                
                <div class="footer">
                  <div class="footer-logo">KNUST - Kwame Nkrumah University of Science and Technology</div>
                  <div>Cybersecurity Training Program | Confidential Document</div>
                  <div style="margin-top: 5px;">Generated by KNUST Admin System</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
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
