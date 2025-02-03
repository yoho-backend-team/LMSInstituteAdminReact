import { Button, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { resendStudentNotification } from 'features/notification-management/student-notifications/services/studentNotificationServices';
import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

const AllNotificationBodySection = ({ allNotifications }) => {
  const [selectedNotification, setSelectedNotification] = useState(null);

  const handleSubmit = async (id) => {
    try {
      const data = {
        id: id,
        notification_id: id,
      };
       console.log("hello");
       
      const response = await resendStudentNotification(data);

      console.log('sucess response', response);

      if (response.data && response.data.message) {
        toast.success(response.data.message);
      } else {
        toast.error(response.message || 'Failed to resend notification');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast.error('An error occurred while resending the notification');
    }
  };

  const handleView = (notification) => {
    setSelectedNotification(notification);
    console.log('Notification title:', notification?.title);
  };
  

  const handleClose = () => {
    setSelectedNotification(null);
  };

  const RowOptions = ({ row }) => {
    return (
      <>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, alignContent: 'start' }}>
          <Button size="small" variant="outlined" color="secondary" onClick={() => handleView(row)}>
            View
          </Button>
          <Button onClick={() => handleSubmit(row.uuid)} size="small" variant="outlined" color="secondary" sx={{ gap: 1 }}>
            Resend
          </Button>
        </Box>
      </>
    );
  };

  const columns = [
    {
      flex: 0.25,
      minWidth: 120,
      headerName: 'Id',
      field: 'student_id',
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },

    {
      flex: 0.65,
      minWidth: 190,
      field: 'title',
      headerName: 'Title',
      sortable: false,
      renderCell: ({ row }) => {
        console.log('row data', row);
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
                {row?.title}
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
                {row?.body}
              </Typography>
            </Box>
          </Box>
        );
      }
    },

    {
      flex: 0.15,
      minWidth: 200,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: ({ row }) => {
        // console.log('Row data in renderCell:', row);
        return <RowOptions row={row} />;
      }
    }
  ];

  return (
    <Grid>
      <DataGrid
        sx={{
          '& .MuiDataGrid-row': {
            border: '1px solid #e6e5e7',
            borderLeft: 'none',
            borderRight: 'none'
          },
          '& .MuiDataGrid-row': {
            border: '1px solid #e6e5e7',
            borderLeft: 'none',
            borderRight: 'none',
            ':hover': {
              backgroundColor: '#f5f5f7',
              border: '1px solid #e6e5e7',
              borderLeft: 'none',
              borderRight: 'none'
            }
          },
          '& .MuiDataGrid-columnHeaders': {
            border: '1px solid #e6e5e7',
            borderLeft: 'none',
            borderRight: 'none'
          }
        }}
        autoHeight
        rowHeight={62}
        rows={ allNotifications ? allNotifications : []}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        disableColumnMenu={true}
        disableColumnSorting={true}
      />
      <Modal open={!!selectedNotification} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
            borderRadius: 2
          }}
        >
          <Typography variant="h3" gutterBottom>
            {selectedNotification?.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {selectedNotification?.body}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

AllNotificationBodySection.propTypes = {
  allNotifications: PropTypes.any
};

export default AllNotificationBodySection;
