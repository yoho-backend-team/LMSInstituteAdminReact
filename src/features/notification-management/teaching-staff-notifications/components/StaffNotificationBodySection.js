// ** React Imports
import { useState } from 'react';
// ** MUI Imports
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import toast from 'react-hot-toast';

// ** Custom Components Imports
// import ImageIcon from '@mui/icons-material/Image';
import { getInitials } from 'utils/get-initials';

import { resendStaffNotification } from '../services/staffNotificationServices';

const StaffNotificationBodySection = ({ staffNotifications,selectedBranchId }) => {
  console.log(staffNotifications);

  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // ** Hooks

  // ** renders client column
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

      const { title, body } = selectedNotification.institute_notifications;

      const data = {
        id: id,
        notification_id: selectedNotification.notification_id, // Include the notification_id field
        body: body,
        branch_id: selectedBranchId,
        title: title
      };

      const response = await resendStaffNotification(data);

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
      field: 'staff_id',
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
      flex: 0.25,
      minWidth: 280,
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
      flex: 0.15,
      minWidth: 190,
      field: 'title',
      headerName: 'Title',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.institute_notifications?.title}
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
              {row?.institute_notifications?.body}
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

  // const notification = [
  //   {
  //     id: 1,
  //     invoiceStatus: 'Sent',
  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 100,
  //     issuedDate: '2025-01-01',
  //     balance: 55,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 2,
  //     invoiceStatus: 'Sent',
  //     name: 'John Doe',
  //     companyEmail: 'arunbalaji.com',
  //     total: 200,
  //     issuedDate: '2000-01-01',
  //     balance: 50,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 3,
  //     invoiceStatus: 'Sent',
  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 300,
  //     issuedDate: '25-01-01',
  //     balance: 40,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 4,
  //     invoiceStatus: 'Sent',
  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 40,
  //     issuedDate: '202-01-01',
  //     balance: 30,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 5,
  //     invoiceStatus: 'Sent',
  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 50,
  //     issuedDate: '20-01-01',
  //     balance: 0,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   }
  // ];

  return (
    <Card>
      <Divider sx={{ m: '0 !important' }} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={staffNotifications}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  );
};

export default StaffNotificationBodySection;
