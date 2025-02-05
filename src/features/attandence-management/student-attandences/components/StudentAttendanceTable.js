import React from 'react';
import { Box, Typography, Avatar, Card, MenuItem, TextField, CssBaseline, Tooltip, Grid, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { updateStudentAttendanceStatus } from '../services/studentAttendanceServices';
import { getInitials } from 'utils/get-initials';
import { getImageUrl } from 'utils/imageUtils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StatusChangeDialog from 'components/modal/DeleteModel';

const userStatusObj = {
  present: 'success',
  absent: 'error'
};

const renderClient = (row) => {
  if (row?.student?.image) {
    return <Avatar src={getImageUrl(row?.student?.image)} sx={{ width: 56, height: 56 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        sx={{ width: 56, height: 56, fontWeight: 500, fontSize: (theme) => theme.typography.h5.fontSize, bgcolor: 'secondary.main' }}
      >
        {getInitials(row?.student?.full_name || '')}
      </Avatar>
    );
  }
};

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#dc004e'
    }
  }
});

const StudentAttendanceTable = ({ ClassData, setRefetch }) => {
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (ClassData && ClassData.students) {
      console.log('ClassData:', ClassData);
      setStudents(ClassData.students);
    } else {
      console.warn('ClassData is null or does not contain students.');
    }
  }, [ClassData]);

  const handleStatusValue = (e, row) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(row);
  };

  const handleStatusChangeApi = async () => {
    const attedence = statusValue?.attedence === 'present' ? 'absent' : 'present';
    const data = {
      attedence: attedence,
      attedence_id: ClassData?.uuid,
      student: statusValue?.student?._id
    };

    const response = await updateStudentAttendanceStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  if (!ClassData) {
    return (
      <Typography variant="h6" color="error" align="center">
        No class data available.
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{ padding: 4, marginBottom: 3,marginTop:3, border: '1px solid #ccc',background: 'linear-gradient(to right, #a18cd1, #fbc2eb)'}}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', paddingBottom: 5,color:"white" }}>
          Attendance Report
        </Typography>
        <Grid container spacing={3}>
          {students.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row?.student?.id}>
              <Card
                sx={{
                  padding: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  borderTopLeftRadius:25,
                  borderBottomRightRadius:25,
                  alignItems: 'center',
                  height: '100%',
                  transition: '0.3s',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-5px)'
                  },
                  borderTop: 1,
                  borderColor: 'yellow'
                }}
              >
                <Box sx={{ flex: '1 0 auto' }}>{renderClient(row)}</Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                  <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 500, paddingBottom: 1 }}>
                    {row?.student?.full_name || 'None'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.disabled', paddingBottom: 1 }}>
                    Email: {row?.student?.email || 'None'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', paddingBottom: 1 }}>
                    ID: {row?.student?.id || 'None'}
                  </Typography>
                  <Tooltip title="Change status">
                    <TextField
                      size="small"
                      select
                      value={row?.attedence}
                      label="Status"
                      id="custom-select"
                      sx={{
                        color: userStatusObj[row?.attedence],
                        mt: 2,
                        '& .MuiSelect-select': {
                          backgroundColor: row?.attedence === 'present' ? '#d4edda' : '#f8d7da',
                          borderColor: row?.attedence === 'present' ? '#28a745' : '#dc3545',
                          color: row?.attedence === 'present' ? '#155724' : '#721c24'
                        }
                      }}
                      onChange={(e) => handleStatusValue(e, row)}
                      SelectProps={{
                        sx: {
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: row?.attedence === 'present' ? '#28a745' : '#dc3545'
                          }
                        }
                      }}
                    >
                      <MenuItem value="present">Present</MenuItem>
                      <MenuItem value="absent">Absent</MenuItem>
                    </TextField>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <StatusChangeDialog
        open={statusChangeDialogOpen}
        setOpen={setStatusChangeDialogOpen}
        description="Are you sure you want to change the status?"
        title="Change Status"
        handleSubmit={handleStatusChangeApi}
      />
    </ThemeProvider>
  );
};

StudentAttendanceTable.propTypes = {
  ClassData: PropTypes.any,
  setRefetch: PropTypes.any
};

export default StudentAttendanceTable;
