import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'components/icon';
import { useState } from 'react';
import { getInitials } from 'utils/get-initials';

import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import PaymentSalarySkeleton from 'components/cards/Skeleton/PaymentSalarySkeleton';
import SalariesDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { selectLoading, selectTeachingStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesSelectors';
import { getAllStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesThunks';
import { deleteTeachingStaffSalary } from '../teaching-staffs/services/teachingStaffSalariesServices';
import SalaryAddDrawer from './SalaryAddDrawer';
import SalaryCardHeader from './SalaryCardHeader';
import SalaryEditDrawer from './SalaryEditDrawer';
import SalaryViewDrawer from './SalaryViewDrawer';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

// ** renders client column
const renderClient = (row) => {
  if (row?.staff?.image) {
    return <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.staff?.image}`} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        color={row?.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row?.name || 'John Doe')}
      </Avatar>
    );
  }
};

const userStatusObj = {
  paid: 'success',
  pending: 'warning',
  refund: 'secondary'
};

const SalaryTable = () => {
  // ** State
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);

  const dispatch = useDispatch();
  const TeachingStaffSalaries = useSelector(selectTeachingStaffSalaries);
  const TeachingStaffSalariesLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(TeachingStaffSalaries);
  useEffect(() => {
    dispatch(getAllStaffSalaries({ branch_id: selectedBranchId }));
  }, [dispatch, selectedBranchId, refetch]);

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const [salariesDeleteModelOpen, setSalariesDeleteModelOpen] = useState(false);

  const [selectedSalariesDeleteId, setSelectedSalariesDeleteId] = useState(null);

  const [statusValue, setStatusValue] = useState('');
  const [staffValue, setStaffValue] = useState('');

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffSalaries(data));
  };

  const handleFilterByStaffType = (e) => {
    setStaffValue(e.target.value);
    const data = { type: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffSalaries(data));
  };

  const handleRowClick = (rowData) => {
    setSelectedRows(rowData);
  };

  const handleDelete = useCallback((itemId) => {
    setSelectedSalariesDeleteId(itemId);
    setSalariesDeleteModelOpen(true);
  }, []);

  // Handle branch deletion
  const handleSalariesDelete = async () => {
    const result = await deleteTeachingStaffSalary({ id: selectedSalariesDeleteId });
    if (result.success) {
      toast.success(result.message);
      setRefetch((state) => !state);
    } else {
      toast.error(result.message);
    }
  };

  const [salaryViewOpen, setSalaryViewUserOpen] = useState(false);
  const toggleSalaryViewDrawer = () => {
    setSalaryViewUserOpen(!salaryViewOpen);
    console.log('Toggle drawer');
  };

  const defaultColumns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography component={LinkStyled} to={`/apps/invoice/preview/${row.id}`}>
          {`#${row.id}`}
        </Typography>
      )
    },
    {
      flex: 1.25,
      minWidth: 140,
      field: 'transactionId',
      headerName: 'Transaction ID',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.transaction_id}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 210,
      field: 'name',
      headerName: 'Staff',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {row.staff?.staff_name}
              </Typography>
              <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
                {row.staff?.email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 1.25,
      minWidth: 120,
      field: 'total',
      headerName: 'Salary Amount',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{`$${row.salary_amount || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'PaymentDate',
      headerName: 'Payment Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.paid_date}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        );
      }
    }
  ];

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 120,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OptionsMenu
            menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
            iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
            options={[
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleSalaryViewDrawer();
                  }
                }
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: {
                  onClick: () => {
                    handleRowClick(row);
                    toggleEditUserDrawer();
                  }
                }
              },
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              },
              {
                text: 'Delete',
                icon: <Icon icon="mdi:delete-outline" />,
                menuItemProps: {
                  onClick: () => handleDelete(row.id)
                }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  return (
    <DatePickerWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Salary" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Status"
                    defaultValue={''}
                    SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Staff Type"
                    defaultValue={''}
                    SelectProps={{ value: staffValue, onChange: (e) => handleFilterByStaffType(e) }}
                  >
                    <MenuItem value="">Select Option</MenuItem>
                    <MenuItem value="teaching">Teaching</MenuItem>
                    <MenuItem value="non-teaching">Non Teaching</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <SalaryCardHeader selectedBranchId={selectedBranchId} selectedRows={selectedRows} toggle={toggleAddUserDrawer} />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {TeachingStaffSalariesLoading ? (
              <PaymentSalarySkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                pagination
                rowHeight={62}
                rows={TeachingStaffSalaries?.data}
                columns={columns}
                disableRowSelectionOnClick
                pageSizeOptions={[10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
              />
            )}
          </Card>
        </Grid>
      </Grid>
      {/* Add Drawer */}
      <SalaryAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} setRefetch={setRefetch} />

      {/* Edit Drawer */}
      <SalaryEditDrawer
        setRefetch={setRefetch}
        open={editUserOpen}
        toggle={toggleEditUserDrawer}
        selectedRows={selectedRows}
        handleRowClick={handleRowClick}
      />

      {/* Delte Modal */}
      <SalariesDeleteModel
        open={salariesDeleteModelOpen}
        setOpen={setSalariesDeleteModelOpen}
        description="Are you sure you want to delete this Salaries?"
        title="Delete"
        handleSubmit={handleSalariesDelete}
      />

      {/* View Drawer */}
      <SalaryViewDrawer open={salaryViewOpen} toggle={toggleSalaryViewDrawer} selectedRowDetails={selectedRows} />
    </DatePickerWrapper>
  );
};

export default SalaryTable;
