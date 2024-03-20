// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** React Router Import
// import { Link } from 'react-router-dom';
// ** Custom Components Imports
import toast from 'react-hot-toast';
import { resendNotification } from '../services/allNotificationServices';

const AllNotificationBodySection = ({ allNotifications, selectedBranchId }) => {
  console.log(allNotifications);

  // ** State
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const handleSubmit = async (id) => {
    try {
      const selectedNotification = allNotifications.find((notification) => notification.id === id);

      if (!selectedNotification) {
        throw new Error('Notification not found');
      }

      const data = {
        id: id,
        branch_id: selectedBranchId
      };

      const response = await resendNotification(data);

      if (response.success) {
        // Handle success
        toast.success(response.message);
      } else {
        // Handle failure
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      // Handle error
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
      flex: 0.1,
      minWidth: 120,
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

    // {
    //   flex: 0.1,
    //   minWidth: 120,
    //   field: 'image',
    //   headerName: 'Image',
    //   renderCell: ({ row }) => {
    //     return (
    //       <Avatar sx={{ width: 38, height: 38 }}>
    //         {row?.profile_image ? (
    //           <img src={row.profile_image} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    //         ) : (
    //           <ImageIcon />
    //         )}
    //       </Avatar>
    //     );
    //   }
    // },

    {
      flex: 0.15,
      minWidth: 190,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.title}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      field: 'body',
      minWidth: 170,
      headerName: 'Description',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.body}
            </Typography>
          </Box>
        );
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
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
        rows={allNotifications}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  );
};

export default AllNotificationBodySection;
