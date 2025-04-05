import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

const AddPlacement = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyAddress: '',
    contactPerson: '',
    contactNumber: '',
    studentName: '',
    studentID: '',
    studentBatch: '',
    studentCourse: '',
    interviewDate: '',
    qualification: '',
    skills: '',
    minMarks: ''
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
    <Container
      // maxWidth="md"
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'grey.100'
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" marginTop={2}>
        <Typography variant="h2" gutterBottom fontWeight={600} color="primary">
          Add Placement Details
        </Typography>
        {/* <Button variant="outlined" onClick={handleCancel}>
          <CancelIcon />
        </Button> */}
      </Grid>

      {/* Dotted Divider */}
      <Grid item xs={12}>
        <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Company Details */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Company Details
                </Typography>
              </Grid>
            </Box>

            <Box
              sx={{
                flex: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                padding: '20px',
                borderRadius: '8px',
                width: '100%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'grey.200'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Address"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Person"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Student Details */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Student Details
                </Typography>
              </Grid>
            </Box>
            <Box
              sx={{
                flex: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                padding: '20px',
                borderRadius: '8px',
                width: '100%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'grey.200'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Student Name"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Student ID" name="studentID" value={formData.studentID} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Batch" name="studentBatch" value={formData.studentBatch} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Course"
                    name="studentCourse"
                    value={formData.studentCourse}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Interview Details */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Interview Details
                </Typography>
              </Grid>
            </Box>
            <Box
              sx={{
                flex: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                padding: '20px',
                borderRadius: '8px',
                width: '100%',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'grey.200'
              }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Interview Date"
                  name="interviewDate"
                  type="date"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Eligibility Criteria */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{color:'grey.500'}}>Eligibility Criteria</Typography>
              </Grid>
            </Box>
            <Box
            sx={{
              flex: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              padding: '20px',
              borderRadius: '8px',
              width: '100%',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'grey.200'
            }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Skills Required" name="skills" value={formData.skills} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Minimum Marks" name="minMarks" value={formData.minMarks} onChange={handleChange} required />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 ,mb: 4}}>
              <Button variant="tonal" color="secondary" onClick={handleCancel}>
                Cancel
              </Button>

              <Button type="submit" variant="contained">
                Add Student
              </Button>
            </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddPlacement;
