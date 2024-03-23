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
// ** React Router Import
// ** Custom Components Imports
import toast from 'react-hot-toast';

import { getInitials } from 'utils/get-initials';

import { resendStudentNotification } from '../services/studentNotificationServices';

const NotificationBodySection = ({ studentNotifications, selectedBranchId }) => {
  console.log(studentNotifications);
  // ** State

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

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
          {getInitials(row?.first_name || 'John Doe')}
        </Avatar>
      );
    }
  };

  // const handleSubmit = async (id) => {
  //   try {
  //     const selectedNotification = studentNotifications.find((notification) => notification.id === id);

  //     if (!selectedNotification) {
  //       throw new Error('Notification not found');
  //     }

  //     const { title, body } = selectedNotification.institute_notifications;

  //     const data = {
  //       id: id,
  //       body: body,
  //       branch_id: selectedBranchId,
  //       title: title
  //     };

  //     const response = await resendNotification({ id, title, body, selectedBranchId });

  //     if (response.success) {
  //       // Handle success
  //       toast.success(response.message);
  //     } else {
  //       // Handle failure
  //       toast.error(response.message);
  //     }
  //   } catch (error) {
  //     console.error('Error in handleSubmit:', error);
  //     // Handle error
  //     toast.error('Failed to resend notification');
  //   }
  // };

  const handleSubmit = async (id) => {
    try {
      const selectedNotification = studentNotifications.find((notification) => notification.id === id);

      if (!selectedNotification) {
        throw new Error('Notification not found');
      }

      // const { title, body } = selectedNotification.institute_notifications;

      const data = {
        id: id,
        notification_id: selectedNotification.notification_id, // Include the notification_id field
        // body: body,
        // branch_id: selectedBranchId,
        // title: title
      };

      const response = await resendStudentNotification(data);

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

  // ** Hooks

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
            {renderClient(row)}
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
        rows={studentNotifications}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Card>
  );
};

export default NotificationBodySection;
