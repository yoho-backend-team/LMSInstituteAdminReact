import { Card,CardContent,Paper } from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { resendStudentNotification } from 'features/notification-management/student-notifications/services/studentNotificationServices';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { motion } from "framer-motion"



const AllNotificationCard = ({ notification, onResend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <Card
        component={Paper}
        elevation={1}
        sx={{
          backgroundColor: "grey.50",
          p: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: (theme) => theme.shadows[4],
            bgcolor: "grey.50",
          },
        }}
      >
        <CardContent sx={{ flexGrow: 1, p: 0, "&:last-child": { pb: 0 } }}>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          
            <Box sx={{ flex: 1,display:'flex',justifyContent:'flex-end' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: "text.secondary" }}>
                ID: {notification?.id}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "text.secondary", fontSize: "1rem", mb: 1 }}>
              {notification?.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {notification?.body}
            </Typography>
          </Box>

          <Box sx={{ mt: "auto", textAlign: "right" }}>
            <Button
              onClick={() => onResend(notification?.uuid)}
              size="small"
              variant="contained"
              sx={{
                minWidth: 80,
                bgcolor: "black",
                color: "white",
                "&:hover": {
                  bgcolor: "#333",
                },
              }}
            >
              Resend
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}


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

  // const RowOptions = ({ id }) => {
  //   return (
  //     <>
  //       <Button onClick={() => handleSubmit(id)} size="small" variant="outlined" color="secondary">
  //         Resend
  //       </Button>
  //     </>
  //   );
  // };

  // const columns = [
  //   {
  //     flex: 0.25,
  //     minWidth: 120,
  //     headerName: 'Id',
  //     field: 'student_id',
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
  //           {row?.id}
  //         </Typography>
  //       );
  //     }
  //   },

  //   {
  //     flex: 0.65,
  //     minWidth: 190,
  //     field: 'title',
  //     headerName: 'Title',
  //     renderCell: ({ row }) => {
  //       return (
  //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //           <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
  //             <Typography
  //               noWrap
  //               sx={{
  //                 fontWeight: 600,
  //                 textDecoration: 'none',
  //                 color: 'text.secondary',
  //                 '&:hover': { color: 'primary.main' },
  //                 overflow: 'hidden',
  //                 display: '-webkit-box',
  //                 WebkitLineClamp: 1,
  //                 WebkitBoxOrient: 'vertical',
  //                 textOverflow: 'ellipsis'
  //               }}
  //             >
  //               {row?.title}
  //             </Typography>
  //             <Typography
  //               noWrap
  //               sx={{
  //                 color: 'text.secondary',
  //                 fontSize: '0.75rem',
  //                 mt: 1,
  //                 overflow: 'hidden',
  //                 display: '-webkit-box',
  //                 WebkitLineClamp: 1,
  //                 WebkitBoxOrient: 'vertical',
  //                 textOverflow: 'ellipsis'
  //               }}
  //             >
  //               {row?.body}
  //             </Typography>
  //           </Box>
  //         </Box>
  //       );
  //     }
  //   },

  //   {
  //     flex: 0.15,
  //     minWidth: 130,
  //     sortable: false,
  //     field: 'actions',
  //     headerName: 'Actions',
  //     renderCell: ({ row }) => <RowOptions id={row?.uuid} />
  //   }
  // ];

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* <DataGrid
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
      /> */}
<Grid item xs={12}>
        <Typography variant="h2" sx={{ fontWeight: 600, mb: 3 }}>
          All Notifications
        </Typography>
      </Grid>


      {allNotifications?.map((notification) => (
        <Grid item xs={12} sm={6} md={4} key={notification.id}>
          <AllNotificationCard notification={notification} onResend={handleSubmit} />
        </Grid>
      ))}

    </Grid>
  );
};

AllNotificationBodySection.propTypes = {
  allNotifications: PropTypes.any
};

export default AllNotificationBodySection;