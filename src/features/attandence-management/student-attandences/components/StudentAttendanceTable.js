import { Grid, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import StatusChangeDialog from 'components/modal/DeleteModel';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateStudentAttendanceStatus } from '../services/studentAttendanceServices';
import { getInitials } from 'utils/get-initials';

const renderClient = (row) => {
  if (row?.attendance?.student?.image) {
    return (
      <Avatar
        src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.attendance?.student?.image}`}
        sx={{ mr: 2.5, width: 38, height: 38 }}
      />
    );
  } else {
    return (
      <Avatar
        skin="light"
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.studentAttendance?.student?.full_name || '')}
      </Avatar>
    );
  }
};

const StudentAttendanceTable = ({ ClassData, setRefetch }) => {
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
            {row?.studentAttendance?.[0]?.student?.student_id}
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {console.log(row,row?.studentAttendance)}
                {row?.studentAttendance?.[0]?.student?.full_name}
                {/* {row?.studentAttendance?.[0]?.student?.full_name} */}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.studentAttendance?.[0]?.student?.email}
              </Typography>
            </Box>
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
            value={row?.attendance?.row?.studentAttendance?.student?.is_present}
            label="status"
            id="custom-select"
            sx={{
              color: userStatusObj[row?.studentAttendance?.student?.is_present]
            }}
            onChange={(e) => handleStatusValue(e, row)}
            SelectProps={{
              sx: {
                borderColor: row?.attendance?.title === 'present' ? 'success' : 'error',
                color: userStatusObj[row?.studentAttendance?.student?.is_present]
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
  console.log(ClassData,"classData")
  return (
    <>
      <Grid>
        <Card>
          <DataGrid autoHeight rowHeight={80} rows={ClassData?.data || []} columns={columns} disableRowSelectionOnClick />
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

StudentAttendanceTable.propTypes = {
  ClassData: PropTypes.any,
  setRefetch: PropTypes.any
};

export default StudentAttendanceTable;
