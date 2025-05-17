import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Grid, TextField, MenuItem, Button, Container } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import client from 'api/client';
import { useInstitute } from 'utils/get-institute-details';
import { getAllStudents } from 'features/student-management/students/services/studentService';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import CustomChip from 'components/mui/chip';

const EditPlacementModal = ({ open, onClose, placementId, refetch }) => {
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
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      companyName: '',
      companyAddress: '',
      contactEmail: '',
      contactNumber: '',
      students: [],
      jobName: '',
      jobDescription: '',
      jobSkills: '',
      interviewDate: '',
      venue: '',
      scheduleAddress: '',
      courseName: '',
      education: ''
    }
  });
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const fetchPlacement = async () => {
    console.log('Calling fetchPlacement for:', placementId);
    try {
      console.log('Fetching placement:', placementId);
      const { data } = await client.placements.getById({ placementId });
      console.log('Api data:', data);
      console.log('student data:', data.student);

      if (data) {
        const studentIds = data.student.map((s) => s._id);
        console.log('selected students:', studentIds);
        const studentObjects = data.student;
        reset({
          companyName: data.company.name,
          companyAddress: data.company.address,
          contactEmail: data.company.email,
          contactNumber: data.company.phone,
          students: studentIds,
          jobName: data.job.name,
          jobDescription: data.job.description,
          jobSkills: data.job.skils.join(', '),
          interviewDate: data.schedule.interviewDate.slice(0, 10),
          venue: data.schedule.venue,
          scheduleAddress: data.schedule.address,
          courseName: data.eligible.courseName,
          education: data.eligible.education.join(', ')
        });
        setSelectedStudentIds(studentIds);
        setSelectedStudents(data.student);
      }
    } catch (err) {
      toast.error('Failed to load placement data');
      console.error('API fetch error:', err);
    }
  };

  useEffect(() => {
    console.log('EditPlacementModal mounted with placementId:', placementId);
    if (placementId) fetchPlacement();
  }, [placementId]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await getAllStudents({ branch_id: selectedBranchId });
        setActiveStudents(res.data || []);
      } catch (err) {
        console.error('Failed to fetch students', err);
      }
    };
    fetchStudents();
  }, [selectedBranchId]);

  const handleStudentsChange = (event) => {
    const selectedIds = event.target.value;
    const filteredStudents = activeStudents.filter((student) => selectedIds.includes(student._id));
    setSelectedStudentIds(selectedIds);
    setSelectedStudents(filteredStudents);
    setValue('students', event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        
        student: data.students,
        
      };
      console.log('students:', data.students);

      const result = await client.placements.update({placementId, payload});
      toast.success('Placement updated successfully!');
      onClose();
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update placement');
    }
  };
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1000,
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            padding: 3,
            overflowY: 'auto',
            maxHeight: '90vh'
          }}
        >
          <Typography variant="h2" fontWeight={600} color="primary" gutterBottom>
            Edit Placement
          </Typography>

           {/* Dotted Divider */}
              <Grid item xs={12}>
                <Box sx={{ borderBottom: '2px dashed ', borderColor: 'grey.300', width: '100%', my: 3 }} />
              </Grid>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                        render={({ field }) => <TextField {...field} fullWidth label="Company Name" disabled />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="companyAddress"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Company Address" disabled />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="contactEmail"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Contact Email" disabled />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="contactNumber"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Contact Number" disabled />}
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
                        render={({ field }) => <TextField {...field} fullWidth label="Job Name" disabled />}
                      />{' '}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="jobDescription"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Job Description" disabled />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="jobSkills"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Skills (comma-separated)" disabled />}
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
                            //   error={Boolean(errors.students)}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '8px',
                                // backgroundColor: 'white',
                                boxShadow: 'none',
                                height: '44px'
                              },
                              '& .MuiInputLabel-root': {
                                top: '-4px'
                              },
                              '& .MuiInputBase-root.Mui-disabledd': {
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
                          <TextField {...field} fullWidth label="Interview Date" type="date" InputLabelProps={{ shrink: true }} disabled />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="venue"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Venue" disabled />}
                      />{' '}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="scheduleAddress"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Address" disabled />}
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
                        render={({ field }) => <TextField {...field} fullWidth label="Course Name" disabled />}
                      />{' '}
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="education"
                        control={control}
                        render={({ field }) => <TextField {...field} fullWidth label="Education (comma-separated)" disabled />}
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
        </Box>
      </Box>
    </Modal>
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

export default EditPlacementModal;
