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
import { resendStaffNotification } from '../services/staffNotificationServices';
import { getImageUrl } from 'utils/imageUtils';
import { profilePlaceholder } from 'utils/placeholders';

const StaffNotificationBodySection = ({ staffNotifications }) => {
  const renderClient = (row) => {
    if (row?.avatar?.length) {
      return <Avatar src={getImageUrl(row?.staff?.image)} sx={{ mr: 2.5, width: 38, height: 38 }} />;
    } else {
      return (
        <Avatar
          skin="light"
          color={row?.avatarColor || 'primary'}
          src={ row?.staff?.image ?getImageUrl(row?.staff?.image) : profilePlaceholder}
          sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
        >
          {getInitials(row?.staff?.image || 'John Doe')}
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

      const response = await resendStaffNotification(data);
      console.log('sucess response', response);

      if (response.data) {
        toast.success(response.data);
      } else {
        toast.error('Failed to resend notification'); 
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
            {row?.id}
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
                {row?.staff?.full_name}
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
      flex : 0.3,
      minWidth : 150,
      sortable : false,
      field : "status",
      headerName : "Status",
      renderCell : ({row}) => <Typography>{row?.status}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 150,
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
        rows={staffNotifications?staffNotifications : []}
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

StaffNotificationBodySection.propTypes = {
  staffNotifications: PropTypes.any
};

export default StaffNotificationBodySection;
