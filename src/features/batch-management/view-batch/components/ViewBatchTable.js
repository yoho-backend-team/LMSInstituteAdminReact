import { Grid, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Pagination from '@mui/material/Pagination';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ViewBatchTable = ({ students }) => {

  const [searchQuery, setSearchQuery] = useState('');

  if (!students) {
    return null;
  }
  const filteredStudents = students.filter((student) => student?.full_name.toLowerCase().includes(searchQuery.toLowerCase()));


  const columns = [
    {
      minWidth: 250,
      field: 'id',
      headerName: 'Student ID',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.id}
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
            <Avatar src={row?.student?.image} alt={row?.first_name} />
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
                {row?.email}
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
              +91 {row?.contact_info?.phone_number}
            </Typography>
            <div>
              <Typography
                sx={{ display: 'flex', color: 'text.secondary', textTransform: 'capitalize', flexShrink: 1, wordWrap: 'break-word', mt: 1 }}
              >
                {row?.contact_info?.address1} {row?.contact_info?.address2} {row?.contact_info?.city} {row?.contact_info?.state} {row?.contact_info?.pincode}
              </Typography>
            </div>
          </Box>
        );
      }
    }
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} />
        <Grid item xs={12} sm={4}>
          <TextField sx={{ display: 'flex' }} fullwidth placeholder="Search Student" value={searchQuery} onChange={handleSearchChange} />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ mt: 2 }}>
            <Box sx={{ overflowX: 'auto' }}>
              <DataGrid
                autoHeight
                rowHeight={80}
                rows={filteredStudents}
                columns={columns}
                disableRowSelectionOnClick
                hideFooterPagination
                hideFooter
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination count={10} color="primary" />
      </Grid>
    </>
  );
};

ViewBatchTable.propTypes = {
  students: PropTypes.any
};

export default ViewBatchTable;
