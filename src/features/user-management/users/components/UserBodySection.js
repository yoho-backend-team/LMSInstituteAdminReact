// ** React Imports
import React, { useCallback, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from '@mui/material';

// ** React Router Import
import { Link } from 'react-router-dom';

// ** Custom Components Imports
import CustomChip from 'components/mui/chip';
import CustomAvatar from 'components/mui/avatar';
import UserTableHeader from 'features/user-management/users/components/UserTableHeader';
import UserAddDrawer from 'features/user-management/users/components/UserAddDrawer';

import { getInitials } from 'utils/get-initials';
import { searchUsers, FilterUsersByRole, FilterUsersByStatus } from 'features/user-management/users/services/userServices';
import { setUsers } from 'features/user-management/users/redux/userSlices';
import { getAllUsers } from 'features/user-management/users/redux/userThunks';
import { useDispatch } from 'react-redux';

const userStatusObj = {
  1: 'success',
  0: 'error'
};

// ** renders client column
const renderClient = (row) => {
  if (row?.profile_image) {
    return <CustomAvatar src={row?.profile_image} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <CustomAvatar
        skin="light"
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name ? row?.name : 'Mohammed Thasthakir')}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({ id }) => {
  return (
    <>
      <Link to={`${id}`} state={{ id: id }}>
        <Button size="small" variant="outlined" color="secondary">
          View
        </Button>
      </Link>
    </>
  );
};

const UserBodySection = ({ groups, users }) => {
  // ** State
  const [role, setRole] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);

  // ** Hooks
  const dispatch = useDispatch();

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handleFilter = useCallback(
    async (val) => {
      try {
        setValue(val);
        const result = await searchUsers(val);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleRoleChange = useCallback(
    async (e) => {
      try {
        setRole(e.target.value);
        const result = await FilterUsersByRole(e.target.value);
        if (result.success) {
          console.log('Search results:', result.data);
          dispatch(setUsers(result.data));
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch]
  );

  const handleStatusChange = useCallback(
    async (e) => {
      if (e.target.value != '') {
        try {
          setStatus(e.target.value);
          const result = await FilterUsersByStatus(e.target.value);
          if (result.success) {
            console.log('Search results:', result.data);
            dispatch(setUsers(result.data));
          } else {
            console.log(result.message);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (e.target.value == '') {
        dispatch(getAllUsers());
      }
    },
    [dispatch]
  );
  const columns = [
    {
      flex: 0.1,
      minWidth: 120,
      headerName: 'Id',
      field: 'employee_id',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.id}
          </Typography>
        );
      }
    },
    {
      flex: 0.25,
      minWidth: 280,
      field: 'fullName',
      headerName: 'User',
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
                {row?.name}
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
      flex: 0.15,
      minWidth: 190,
      field: 'designation',
      headerName: 'Designation',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row?.designation}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      field: 'role',
      minWidth: 170,
      headerName: 'Role',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row?.role}
            </Typography>
          </Box>
        );
      }
    },

    {
      flex: 0.15,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status == '1' ? 'Active' : 'InActive'}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
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
      <CardHeader title="Search Filters" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              defaultValue="Select Role"
              SelectProps={{
                value: role,
                displayEmpty: true,
                onChange: (e) => handleRoleChange(e)
              }}
            >
              <MenuItem value="">Select Role</MenuItem>
              {groups?.map((group, index) => (
                <MenuItem key={index} value={group?.id}>
                  {group?.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item sm={6} xs={12}>
            <TextField
              select
              fullWidth
              defaultValue="Select Status"
              SelectProps={{
                value: status,
                displayEmpty: true,
                onChange: (e) => handleStatusChange(e)
              }}
            >
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="1">Active</MenuItem>
              <MenuItem value="0">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
      <Divider sx={{ m: '0 !important' }} />
      <UserTableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
      <DataGrid
        sx={{ p: 2 }}
        autoHeight
        rowHeight={62}
        rows={users}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Card>
  );
};

export default UserBodySection;
