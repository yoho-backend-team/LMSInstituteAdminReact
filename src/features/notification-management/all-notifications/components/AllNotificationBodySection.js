import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { resendStudentNotification } from 'features/notification-management/student-notifications/services/studentNotificationServices';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const AllNotificationBodySection = ({ allNotifications }) => {
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
      flex: 0.25,
      minWidth: 120,
      headerName: 'Id',
      field: 'student_id',
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
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row?.uuid} />
    }
  ];

  return (
    <Grid>
      <DataGrid
        sx={{ 
          '& .MuiDataGrid-row' : {
                border: "1px solid #e6e5e7",
                borderLeft: "none",
                borderRight: "none",
              },
              "& .MuiDataGrid-row" : {
                border : "1px solid #e6e5e7",
                borderLeft: "none",
                borderRight: "none",
                ":hover" : {
                   backgroundColor : "#f5f5f7",
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none"
                }
              },
              "& .MuiDataGrid-columnHeaders" : {
                   border : "1px solid #e6e5e7",
                   borderLeft: "none",
                   borderRight: "none"
              }
        }}
        autoHeight
        rowHeight={62}
        rows={allNotifications?allNotifications:[]}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        disableColumnMenu={true}
        disableColumnSorting={true}
      />
    </Grid>
  );
};

AllNotificationBodySection.propTypes = {
  allNotifications: PropTypes.any
};

export default AllNotificationBodySection;
