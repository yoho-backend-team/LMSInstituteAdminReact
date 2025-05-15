import React, { useState } from "react";
import { Button, TextField, MenuItem, Card, CardContent, Select, FormControl, InputLabel } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import jsPDF from "jspdf";


const data = [
  { id: 1, name: "Alice", activity: 5, performance: 80 },
  { id: 2, name: "Bob", activity: 7, performance: 85 },
  { id: 3, name: "Charlie", activity: 3, performance: 75 },
];

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  { field: "name", headerName: "User Name", width: 180 },
  { field: "activity", headerName: "Activity", width: 180 },
  { field: "performance", headerName: "Performance", width: 250 },
];

const ReportGenerator = () => {
  const [filter, setFilter] = useState("");
  const [userRole] = useState("admin"); // Simulated role check
  const [schedule, setSchedule] = useState({ frequency: "", format: "" });
  
  const filteredData = data.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));





  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("User Report", 20, 10);
    filteredData.forEach((item, index) => {
      doc.text(`${item.id} ${item.name} ${item.activity} ${item.performance}`, 10, 20 + index * 10);
    });
    doc.save("report.pdf");
  };

  const handleScheduleReport = () => {
    localStorage.setItem("scheduledReport", JSON.stringify(schedule));
    alert(`Report Scheduled: ${schedule.frequency} in ${schedule.format} format`);
  };

  return (
    <Card sx={{ padding: 3, maxWidth: 800, margin: "auto", marginTop: 5 }}>
      <CardContent>
        <TextField
          label="Filter by Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <DataGrid rows={filteredData} columns={columns} autoHeight pageSize={10} />
        <div style={{ marginTop: 20, display: "flex", gap: 10,padding:50 }}>
          
        
          <Button variant="contained" onClick={exportToPDF}>Export PDF</Button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="performance" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        {userRole === "admin" && (
          <div style={{ marginTop: 20 }}>
            <h3>Schedule Report (Admin Only)</h3>
            <FormControl fullWidth margin="normal">
              <InputLabel>Frequency</InputLabel>
              <Select
                value={schedule.frequency}
                onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value })}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Format</InputLabel>
              <Select
                value={schedule.format}
                onChange={(e) => setSchedule({ ...schedule, format: e.target.value })}
              >
                
                <MenuItem value="pdf">PDF</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="success" onClick={handleScheduleReport}>
              Schedule Report
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportGenerator;
