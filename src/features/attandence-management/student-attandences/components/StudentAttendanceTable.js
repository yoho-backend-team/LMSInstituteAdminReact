// ** Next Imports
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** Custom Components Imports
// import CustomChip from 'components/mui/chip';
import { Grid, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { updateStudentAttendanceStatus } from '../services/studentAttendanceServices';
import StatusChangeDialog from 'components/modal/DeleteModel';
import toast from 'react-hot-toast';

const StudentAttendanceTable = ({ ClassData,setRefetch }) => {
  const userStatusObj = {
    present: 'success',
    absent: 'error'
  };
  const [statusChangeDialogOpen, setStatusChangeDialogOpen] = useState(false);
  const [statusValue, setStatusValue] = useState({});

  const handleStatusValue = (e, row) => {
    setStatusChangeDialogOpen(true);
    setStatusValue(row);
  };

  const handleStatusChangeApi = async () => {
    console.log('entered', statusValue);
    const data = {
      status: statusValue?.attendance?.title === 'present' ? 'absent' : 'present',
      attendance_id: statusValue?.attendance?.attendance_id
    };
    const response = await updateStudentAttendanceStatus(data);
    if (response.success) {
      toast.success(response.message);
      setRefetch((state) => !state);
    } else {
      toast.error(response.message);
    }
  };

  const columns = [
    {
      flex: 0.75,
      minWidth: 120,
      headerName: 'Student ID',
      field: 'start_date',
      renderCell: (params) => {
        const { row } = params;
        return (
          <Typography variant="body2" sx={{ color: 'text.primary' }}>
            {row?.attendance?.student?.student_id}
          </Typography>
        );
      }
    },
    {
      flex: 0.75,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Student Name',
      renderCell: (params) => {
        const { row } = params;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row?.attendance?.student?.first_name}
              {row?.attendance?.student?.last_name}
            </Typography>
            <Typography sx={{ mt: 1 }}>{row?.attendance?.student?.phone_no}</Typography>
          </Box>
        );
      }
    },

    {
      flex: 0.75,
      minWidth: 180,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <TextField
            size="small"
            select
            value={row?.attendance?.title}
            label="status"
            id="custom-select"
            sx={{
              color: userStatusObj[row?.attendance?.title]
            }}
            onChange={(e) => handleStatusValue(e, row)}
            SelectProps={{
              sx: {
                borderColor: row?.attendance.title === 'present' ? 'success' : 'error',
                color: userStatusObj[row?.attendance?.title]
              }
            }}
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </TextField>
        );
      }
    }
  ];

  return (
    <>
      <Grid>
        <Card>
          <DataGrid autoHeight rowHeight={80} rows={ClassData?.data.studentattendance || []} columns={columns} disableRowSelectionOnClick />
        </Card>
        <StatusChangeDialog
          open={statusChangeDialogOpen}
          setOpen={setStatusChangeDialogOpen}
          description="Are you sure you want to Change Status"
          title="Change Status"
          handleSubmit={handleStatusChangeApi}
        />
      </Grid>
    </>
  );
};

export default StudentAttendanceTable;
