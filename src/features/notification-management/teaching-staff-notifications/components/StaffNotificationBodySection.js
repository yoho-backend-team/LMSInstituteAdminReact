import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { getInitials } from 'utils/get-initials';
import { resendStaffNotification } from '../services/staffNotificationServices';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
const StaffNotificationBodySection = ({ staffNotifications }) => {
  console.log(staffNotifications);

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
          {getInitials(row?.staff?.image || 'John Doe')}
        </Avatar>
      );
    }
  };

  const handleSubmit = async (id) => {
    try {
      const selectedNotification = staffNotifications.find((notification) => notification.id === id);

      if (!selectedNotification) {
        throw new Error('Notification not found');
      }

      const data = {
        id: id,
        notification_id: selectedNotification.notification_id // Include the notification_id field
      };

      const response = await resendStaffNotification(data);

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
      field: 'staff_id',
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
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                // component={Link}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.staff?.staff_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.staff?.email}
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
      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ];

  return (
    <Card>
      <Divider sx={{ m: '0 !important' }} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={staffNotifications?.data}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
      />
      <Grid sx={{ m: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </Card>
  );
};

StaffNotificationBodySection.propTypes = {
  staffNotifications: PropTypes.any
};

export default StaffNotificationBodySection;
