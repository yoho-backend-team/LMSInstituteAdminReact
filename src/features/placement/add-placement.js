import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from 'api/client';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useInstitute } from 'utils/get-institute-details';
import { getAllStudents } from 'features/student-management/students/services/studentService';
import { useSelector } from 'react-redux';
import CustomChip from 'components/mui/chip';

const AddPlacement = () => {
  const navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      }
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      companyName: '',
      companyAddress: '',
      contactEmail: '',
      contactNumber: '',
      students: [],
      institute: '',
      jobName: '',
      jobDescription: '',
      jobSkills: [''],
      interviewDate: '',
      venue: '',
      scheduleAddress: '',
      courseName: '',
      education: ['']
    }
  });

  const [activeStudents, setActiveStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents({ branch_id: selectedBranchId });
        console.log('Fetched students:', res.data);
        setActiveStudents(res.data || []);
      } catch (err) {
        console.error('Failed to fetch students', err);
      }
    };
  
    fetchStudents();
  }, [selectedBranchId]);
  console.log('Active students:', activeStudents);
  

  const handleStudentsChange = (event) => {
    setValue('students', event.target.value);
    const filteredStudents = activeStudents.filter((student) => event.target.value.includes(student._id));
    setSelectedStudentIds(event.target.value);
    setSelectedStudents(filteredStudents);
  };

  const onFormSubmit = async (data) => {
    const instituteId = useInstitute().getDetails();
    console.log('Institute ID:', instituteId._id,data);

    const payload = {
      company: {
        name: data.companyName,
        address: data.companyAddress,
        email: data.contactEmail,
        phone: data.contactNumber
      },
      student: data.students,
      institute: instituteId._id,
      job: {
        name: data.jobName,
        description: data.jobDescription,
        skils: data.jobSkills.split(',').map((s) => s.trim())
      },
      schedule: {
        interviewDate: data.interviewDate,
        venue: data.venue,
        address: data.scheduleAddress
      },
      eligible: {
        courseName: data.courseName,
        education: data.education.split(',').map((e) => e.trim())
      }
    };

    try {
      console.log('Payload entering:', payload);
      const response = await client.placements.create(payload);
      console.log('placement response:',response);
      if (response){
        toast.success('Placement added successfully!');
        navigate(-1);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add placement.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await client.placements.create(); // Adjust this according to your API
        setActiveStudents(res.data || []);
      } catch (err) {
        console.error('Failed to fetch students', err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <Container
      sx={{
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: '8px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'grey.100',
        padding: '20px'
      }}
    >
      <Typography variant="h2" fontWeight={600} color="primary" gutterBottom>
        Add Placement Details
      </Typography>

      <form onSubmit={handleSubmit(onFormSubmit)}>
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
            <Box sx={boxStyle}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Company Name" required />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="companyAddress"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Company Address" required />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="contactEmail"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Contact Email" required />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="contactNumber"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Contact Number" required />}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Job Details */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Job Details
                </Typography>
              </Grid>
            </Box>
            <Box sx={boxStyle}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="jobName"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Job Name" required />}
                  />{' '}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="jobDescription"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Job Description" required />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="jobSkills"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Skills (comma-separated)" required />}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Students */}

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ color: 'grey.500' }}>
                Students Details
              </Typography>
            </Box>

            <Box sx={boxStyle}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="students"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        fullWidth
                        label="Students *"
                        id="select-multiple-chip"
                        SelectProps={{
                          MenuProps,
                          multiple: true,
                          value: selectedStudentIds,
                          onChange: (e) => handleStudentsChange(e),
                          renderValue: () => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              {selectedStudents.map((student) => (
                                <CustomChip
                                  key={student?._id}
                                  label={`${student?.full_name}`}
                                  sx={{ m: 0.75 }}
                                  skin="light"
                                  color="primary"
                                />
                              ))}
                            </Box>
                          )
                        }}
                        error={Boolean(errors.students)}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '8px', // Match with other fields
                            // backgroundColor: 'white',
                            boxShadow: 'none',
                            height: '44px' // Adjust height
                          },
                          '& .MuiInputLabel-root': {
                            top: '-4px' // Align label correctly
                          },
                          '& .MuiInputBase-root.Mui-disabled': {
                            backgroundColor: '#f0f0f0'
                          }
                        }}
                      >
                        {activeStudents.map((student, index) => (
                          <MenuItem key={index} value={student?._id}>
                            {student?.full_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Dotted Divider */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 2 }} />
          </Grid>

          {/* Schedule Details */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Interview Details
                </Typography>
              </Grid>
            </Box>
            <Box sx={boxStyle}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="interviewDate"
                    control={control}
                    render={({ field }) => (
                      <TextField {...field} fullWidth label="Interview Date" type="date" InputLabelProps={{ shrink: true }} required />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="venue"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Venue" required />}
                  />{' '}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="scheduleAddress"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Address" required />}
                  />{' '}
                </Grid>
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
                <Typography variant="h3" sx={{ color: 'grey.500' }}>
                  Eligibility Criteria
                </Typography>
              </Grid>
            </Box>
            <Box sx={boxStyle}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="courseName"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Course Name" required />}
                  />{' '}
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="education"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth label="Education (comma-separated)" required />}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Submit & Cancel Buttons */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 4 }}>
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const boxStyle = {
  flex: 3,
  border: '1px solid',
  borderColor: 'grey.200',
  padding: '20px',
  borderRadius: '8px',
  width: '100%',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'grey.200'
};

export default AddPlacement;
