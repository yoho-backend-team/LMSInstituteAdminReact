// ** Next Imports
// import { Link } from 'react-router-dom';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
// ** Custom Components Imports
// import CustomAvatar from 'components/mui/avatar';
// ** Utils Import
// import { getInitials } from 'utils/get-initials';

const ViewBatchTable = ({ students }) => {

  if (!students) {
    return null; // Or any other fallback UI
  }
  
  const columns = [
    {
      // flex: 1.5,
      minWidth: 300,
      field: 'id',
      headerName: 'Student ID',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.student?.student_id}
          </Typography>
        );
      }
    },
    {
      // flex: 2,
      minWidth: 300,
      field: 'student',
      headerName: 'Student',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* {renderClient(row)} */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                // href="/apps/user/view/account"
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {row?.student?.first_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row?.student?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      // flex: 2,
      minWidth: 300,
      headerName: 'Contact & Address',
      field: 'Contact',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: 'flex',

              alignItems: 'flex-start',
              flexDirection: 'column',
              flexWrap: 1,
              py: 2
            }}
          >
            <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              +91 {row?.student?.phone_no}
            </Typography>
            <div>
              <Typography
                sx={{ display: 'flex', color: 'text.secondary', textTransform: 'capitalize', flexShrink: 1, wordWrap: 'break-word', mt: 1 }}
              >
                {row?.student?.address_line_1} {row?.student?.address_line_2} {row?.city} {row?.student?.state} {row?.student?.pin_code}
              </Typography>
            </div>
          </Box>
        );
      }
    }

    // {
    //   // flex: 1.3,
    //   minWidth: 200,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }) => {
    //     const userStatus = `${row.is_active}` === 1 ? 'Active' : 'Inactive';
    //     return (
    //       <CustomChip
    //         rounded
    //         skin="light"
    //         size="small"
    //         label={userStatus}
    //         color={userStatusObj[row.student?.is_active]}
    //         sx={{ textTransform: 'capitalize' }}
    //       />
    //     );
    //   }
    // }
  ];

  return (
    <Card>
      <DataGrid autoHeight rowHeight={80} rows={students} columns={columns} disableRowSelectionOnClick />
    </Card>
  );
};

export default ViewBatchTable;
