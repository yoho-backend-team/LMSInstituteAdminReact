import React, { useState } from "react";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

const AddPlacement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    contactPerson: "",
    contactNumber: "",
    studentName: "",
    studentID: "",
    studentBatch: "",
    studentCourse: "",
    interviewDate: "",
    qualification: "",
    skills: "",
    minMarks: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h1" gutterBottom>
          Add Placement Details
        </Typography>
        <Button variant="outlined"  onClick={handleCancel}>
          <CancelIcon />
        </Button>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Company Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Company Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Company Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Contact Number" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
          </Grid>
          
          {/* Student Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Student Details</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Student ID" name="studentID" value={formData.studentID} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Batch" name="studentBatch" value={formData.studentBatch} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Course" name="studentCourse" value={formData.studentCourse} onChange={handleChange} required />
          </Grid>
          
          {/* Interview Details */}
          <Grid item xs={12}>
            <TextField fullWidth label="Interview Date" name="interviewDate" type="date" value={formData.interviewDate} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
          </Grid>
          
          {/* Eligibility Criteria */}
          <Grid item xs={12}>
            <Typography variant="h6">Eligibility Criteria</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Skills Required" name="skills" value={formData.skills} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Minimum Marks" name="minMarks" value={formData.minMarks} onChange={handleChange} required />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPlacement;
