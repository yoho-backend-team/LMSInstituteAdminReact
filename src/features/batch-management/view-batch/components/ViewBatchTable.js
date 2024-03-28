import React from 'react';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

const ViewBatchTable = ({ students }) => {
  console.log('Students', students);

  if (!students) {
    return null; // Or any other fallback UI
  }

  const columns = [
    {
      minWidth: 250,
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
      minWidth: 300,
      field: 'student',
      headerName: 'Student',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={row?.student?.image} alt={row?.student?.first_name} />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 1.65 }}>
              <Typography
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
  ];

  return (
    <>
      {/* <DataGrid autoHeight rowHeight={80} rows={students} columns={columns} disableRowSelectionOnClick
       pagination={false} /> */}
      <Card>
        <Box sx={{ overflowX: 'auto' }}>
          <DataGrid autoHeight rowHeight={80} rows={students} columns={columns} disableRowSelectionOnClick hideFooterPagination />
        </Box>
      </Card>
    </>
  );
};

export default ViewBatchTable;
