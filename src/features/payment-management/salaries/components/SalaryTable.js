// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
// ** Icon Imports
import Icon from 'components/icon';
// ** Third Party Imports
import format from 'date-fns/format';
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Components Imports
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SalariesDeleteModel from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import SalaryAddDrawer from './SalaryAddDrawer';
import SalaryCardHeader from './SalaryCardHeader';
import SalaryEditDrawer from './SalaryEditDrawer';
// ** Styled Components
// import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import MenuItem from '@mui/material/MenuItem';
import PaymentSalarySkeleton from 'components/cards/Skeleton/PaymentSalarySkeleton';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { selectTeachingStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesSelectors';
import { getAllStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesThunks';
import { deleteTeachingStaffSalary } from '../teaching-staffs/services/teachingStaffSalariesServices';
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
    return (
      <Avatar src={`${process.env.REACT_APP_PUBLIC_API_URL}/storage/${row?.staff?.image}`} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
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

/* eslint-disable */
const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
  const value = `${startDate}${endDate !== null ? endDate : ''}`;
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null;
  const updatedProps = { ...props };
  delete updatedProps.setDates;
  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />;
});

/* eslint-enable */
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

  const [loading, setLoading] = useState(true);
  const [statusValue, setStatusValue] = useState('');
  const [staffValue, setStaffValue] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffSalaries(data));
  };
  
  const handleFilterByStaffType = (e) => {
    setStaffValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStaffSalaries(data));
  };

  const handleRowClick = (rowData) => {
    setSelectedRows(rowData);
  };

  // Memoize the handleDelete function to prevent unnecessary re-renders
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
        return  <CustomChip
        rounded
        skin="light"
        size="small"
        label={row.status}
        color={userStatusObj[row.status]}
        sx={{ textTransform: 'capitalize' }}
      />;
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
          {/* <Tooltip title="View">
            <IconButton size="small" sx={{ color: 'text.secondary' }} to={`/apps/invoice/preview/${row.id}`}>
              <Icon icon="tabler:eye" />
            </IconButton>
          </Tooltip> */}
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
                    toggleSalaryViewDrawer(); // Toggle the edit drawer when either the text or the icon is clicked
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
                    toggleEditUserDrawer(); // Toggle the edit drawer when either the text or the icon is clicked
                  }
                }
              },
              {
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              },
              {
                // to: `/apps/invoice/delete/${row.id}`,
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

  // const TeachingStaffSalariesdummyData = [
  //   {
  //     id: 1,
  //     invoiceStatus: 'Sent',
  //     transactionid: '123456',
  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 100,
  //     PaymentDate: '2025-01-01',
  //     balance: 55,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 2,
  //     invoiceStatus: 'Sent',
  //     transactionid: '123456',

  //     name: 'John Doe',
  //     companyEmail: 'arunbalaji.com',
  //     total: 200,
  //     PaymentDate: '2000-01-01',
  //     balance: 50,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 3,
  //     invoiceStatus: 'Sent',
  //     transactionid: '123456',

  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 300,
  //     PaymentDate: '25-01-01',
  //     balance: 40,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 4,
  //     invoiceStatus: 'Sent',
  //     transactionid: '123456',

  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 40,
  //     PaymentDate: '202-01-01',
  //     balance: 30,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   },
  //   {
  //     id: 5,
  //     invoiceStatus: 'Sent',
  //     transactionid: '123456',

  //     name: 'John Doe',
  //     companyEmail: 'john.doe@example.com',
  //     total: 50,
  //     PaymentDate: '20-01-01',
  //     balance: 0,
  //     avatar: '',
  //     avatarColor: 'primary'
  //   }
  // ];

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
            {loading ? (
              <PaymentSalarySkeleton />
            ) : (
              <DataGrid
                sx={{ p: 2 }}
                autoHeight
                pagination
                rowHeight={62}
                // rows={TeachingStaffSalaries}
                rows={TeachingStaffSalaries}
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
      <SalaryAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <SalaryEditDrawer
        setRefetch={setRefetch}
        open={editUserOpen}
        toggle={toggleEditUserDrawer}
        selectedRows={selectedRows}
        handleRowClick={handleRowClick}
      />
      <SalariesDeleteModel
        open={salariesDeleteModelOpen}
        setOpen={setSalariesDeleteModelOpen}
        description="Are you sure you want to delete this Salaries?"
        title="Delete"
        handleSubmit={handleSalariesDelete}
      />
      <SalaryViewDrawer open={salaryViewOpen} toggle={toggleSalaryViewDrawer} selectedRowDetails={selectedRows} />

    </DatePickerWrapper>
  );
};

export default SalaryTable;
