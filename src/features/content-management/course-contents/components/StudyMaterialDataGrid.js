// ** React Imports
import React, { useCallback, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
// import CardHeader from '@mui/material/CardHeader';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

// ** React Router Import
import { Link } from 'react-router-dom';

// ** Custom Components Imports
import CustomChip from 'components/mui/chip';
import CustomAvatar from 'components/mui/avatar';
import UserAddDrawer from 'features/user-management/users/components/UserAddDrawer';
import StudyMaterialHeader from 'features/content-management/course-contents/components/StudyMaterialTableHeader'

import { getInitials } from 'utils/get-initials';
import { searchUsers } from 'features/user-management/users/services/userServices';
import { setUsers } from 'features/user-management/users/redux/userSlices';
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

const StudyMaterial = () => {
  // ** State

  const users = [
    {
      id: 1,
      name: 'John Doe',
      image: 'https://example.com/john_doe.jpg',
      email: 'john.doe@example.com',
      designation: 'Software Engineer',
      role: 'Developer',
      status: 1
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'https://example.com/jane_smith.jpg',
      email: 'jane.smith@example.com',
      designation: 'UX Designer',
      role: 'Designer',
      status: 1
    },
    {
      id: 3,
      name: 'Bob Johnson',
      image: 'https://example.com/bob_johnson.jpg',
      email: 'bob.johnson@example.com',
      designation: 'Product Manager',
      role: 'Manager',
      status: 0
    },
    {
      id: 4,
      name: 'Alice Williams',
      image: 'https://example.com/alice_williams.jpg',
      email: 'alice.williams@example.com',
      designation: 'QA Engineer',
      role: 'Tester',
      status: 1
    },
    {
      id: 5,
      name: 'Charlie Brown',
      image: 'https://example.com/charlie_brown.jpg',
      email: 'charlie.brown@example.com',
      designation: 'System Administrator',
      role: 'Administrator',
      status: 0
    },
    {
      id: 6,
      name: 'Eva Green',
      image: 'https://example.com/eva_green.jpg',
      email: 'eva.green@example.com',
      designation: 'Marketing Specialist',
      role: 'Marketer',
      status: 1
    }
  ];

  const [value, setValue] = useState('');
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
    <>
      <StudyMaterialHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
      <DataGrid
        autoHeight
        rowHeight={80}
        rows={users}
        columns={columns}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
      <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </>
  );
};

export default StudyMaterial;
