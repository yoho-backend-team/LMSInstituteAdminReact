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
  const { control, handleSubmit, setValue, reset } = useForm();
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeStudents, setActiveStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const fetchPlacement = async () => {
    try {
      const { data } = await client.placements.update(placementId);
      if (data) {
        reset({
          companyName: data.company.name,
          companyAddress: data.company.address,
          contactEmail: data.company.email,
          contactNumber: data.company.phone,
          students: data.student.map((s) => s._id),
          jobName: data.job.name,
          jobDescription: data.job.description,
          jobSkills: data.job.skils.join(', '),
          interviewDate: data.schedule.interviewDate.slice(0, 10),
          venue: data.schedule.venue,
          scheduleAddress: data.schedule.address,
          courseName: data.eligible.courseName,
          education: data.eligible.education.join(', ')
        });
      }
    } catch (err) {
    //   toast.error('Failed to load placement data');
    }
  };

  useEffect(() => {
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
    setValue('students', event.target.value);
    const filteredStudents = activeStudents.filter((student) => event.target.value.includes(student._id));
    setSelectedStudentIds(event.target.value);
    setSelectedStudents(filteredStudents);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        company: {
          name: data.companyName,
          address: data.companyAddress,
          email: data.contactEmail,
          phone: data.contactNumber
        },
        student: data.students,
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

      await client.placements.update(placementId, payload); // Ensure this API exists
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
          Edit Placement Details
        </Typography>

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
                      render={({ field }) => <TextField {...field} fullWidth label="Company Name" required value={placementId.companyName}/>}
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
