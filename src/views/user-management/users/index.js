// ** React Imports
import { useState, useCallback, useEffect } from 'react';

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

// ** Axios Import
import axios from 'axios';

// ** Custom Components Imports
import CustomChip from 'components/mui/chip';
import CustomAvatar from 'components/mui/avatar';
import UserSkeleton from 'components/cards/Skeleton//UserSkeleton';

// ** Components Imports
import UserHeaderCard from 'features/user-management/users/components/UserHeaderCard';
import UserTableHeader from 'features/user-management/users/components/UserTableHeader';
import UserAddDrawer from 'features/user-management/users/components/UserAddDrawer';

import { getInitials } from 'utils/get-initials';
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
              {row?.platform_user?.email}
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
          {row?.platform_user?.designation}
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
          {/* <CustomAvatar skin="light" sx={{ mr: 4, width: 30, height: 30 }} 
          color={userRoleObj[row.role].color || 'primary'}
          >
            <Icon icon={userRoleObj[row.role].icon} />
          </CustomAvatar> */}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row?.role_group?.role?.name}
          </Typography>
        </Box>
      );
    }
  },

  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          rounded
          skin="light"
          size="small"
          label={row.is_active == '1' ? 'Active' : 'InActive'}
          color={userStatusObj[row.is_active]}
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

const UserList = () => {
  useEffect(() => {
    getAllGroups();
  }, []);

  const getAllGroups = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/role/get-all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Groups : ', response.data);
        setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllUsers = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/user/get-all`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios
      .request(config)
      .then((response) => {
        console.log('Users : ', response.data);
        setUsers(response.data.data.data);
        setActiveUser(response.data.active);
        setInActiveUser(response.data.inActive);
        // setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  // ** State
  const [role, setRole] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState('');
  const [inActiveUser, setInActiveUser] = useState('');
  const [groups, setGroups] = useState([]);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // ** Hooks
  useEffect(() => {
    getAllUsers();
  }, [addUserOpen]);

  const handleFilter = useCallback(async (val) => {
    setValue(val);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/user/user-search`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params: { search: val }
    };
    await axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        // setGroups(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRoleChange = useCallback(async (e) => {
    setRole(e.target.value);
    console.log(e.target.value);
    if (e.target.value != '') {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/user/get-user-by-role-id`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: { role_id: e.target.value }
      };

      await axios
        .request(config)
        .then((response) => {
          console.log('Roles : ', response.data);
          setUsers(response.data.data);
          // setGroups(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.target.value == '') {
      getAllUsers();
    }
  }, []);

  const handleStatusChange = useCallback(async (e) => {
    setStatus(e.target.value);
    if (e.target.value != '') {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_PUBLIC_API_URL}/api/platform/admin/user-management/user/get-user-by-status`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: { status: e.target.value }
      };

      await axios
        .request(config)
        .then((response) => {
          console.log('Roles : ', response.data);
          setUsers(response.data.data);
          // setGroups(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (e.target.value == '') {
      getAllUsers();
    }
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <>
      {loading ? (
        <UserSkeleton />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sm={6}>
                <UserHeaderCard title={'Total Users'} stats={users?.length} icon={'tabler:user'} />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <UserHeaderCard title={'Total Groups'} stats={groups?.length} avatarColor={'error'} icon={'tabler:user-plus'} />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <UserHeaderCard
                  title={'Active Users'}
                  stats={activeUser ? activeUser : 0}
                  avatarColor={'success'}
                  icon={'tabler:user-check'}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <UserHeaderCard
                  title={'Blocked Users'}
                  stats={inActiveUser ? inActiveUser : 0}
                  avatarColor={'warning'}
                  icon={'tabler:user-exclamation'}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
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
                      {groups.map((group, index) => (
                        <MenuItem key={index} value={group.role.id}>
                          {group.role.name}
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
            </Card>
          </Grid>

          <UserAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
        </Grid>
      )}
    </>
  );
};

export default UserList;
