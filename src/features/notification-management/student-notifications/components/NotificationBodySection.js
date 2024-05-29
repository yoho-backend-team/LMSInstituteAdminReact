import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getInitials } from 'utils/get-initials';
import { resendStudentNotification } from '../services/studentNotificationServices';

const NotificationBodySection = ({ studentNotifications }) => {
  const renderClient = (row) => {
    if (row?.avatar?.length) {
      return <Avatar src={row?.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
    } else {
      return (
        <Avatar
          skin="light"
          color={row?.avatarColor || 'primary'}
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.first_name || 'John Doe')}
        </Avatar>
      );
    }
  };

  const handleSubmit = async (id) => {
    try {
      const data = {
        id: id,
        notification_id: id
      };

      const response = await resendStudentNotification(data);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('Failed to resend notification');
    }
  };

  const RowOptions = ({ id }) => {
    return (
      <>
        <Button onClick={() => handleSubmit(id)} size="small" variant="outlined" color="secondary">
          Resend
        </Button>
      </>
    );
  };

  const columns = [
    {
      flex: 0.14,
      minWidth: 100,
      headerName: 'Id',
      field: 'student_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.notification_id}
          </Typography>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 180,
      headerName: 'User',
      field: 'first_name',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.students?.first_name} {row?.students?.last_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.students?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.3,
      minWidth: 280,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.institute_notifications?.title}
              </Typography>
              <Typography
                noWrap
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  mt: 1,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis'
                }}
              >
                {row?.institute_notifications?.body}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.notification_id} />
    }
  ];

  return (
    <Grid>
      <Divider sx={{ m: '0 !important' }} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={studentNotifications?studentNotifications:[]}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
      />
    </Grid>
  );
};

NotificationBodySection.propTypes = {
  studentNotifications: PropTypes.any
};
export default NotificationBodySection;
