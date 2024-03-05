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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import DeleteDialog from 'components/modal/DeleteModel';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
import SalaryAddDrawer from './SalaryAddDrawer';
import SalaryCardHeader from './SalaryCardHeader';
import SalaryEditDrawer from './SalaryEditDrawer';
// ** Styled Components
// import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { selectTeachingStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesSelectors';
import { getAllStaffSalaries } from '../teaching-staffs/redux/teachingStaffSalariesThunks';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

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
        {getInitials(row?.name || 'John Doe')}
      </Avatar>
    );
  }
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
  const [value, setValue] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [addUserOpen, setAddUserOpen] = useState(false);
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);
  const [editUserOpen, setEditUserOpen] = useState(false);

  const dispatch = useDispatch();
  const TeachingStaffSalaries = useSelector(selectTeachingStaffSalaries);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  console.log(TeachingStaffSalaries);
  useEffect(() => {
    dispatch(getAllStaffSalaries(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  const toggleEditUserDrawer = () => {
    setEditUserOpen(!editUserOpen);
    console.log('Toggle drawer');
  };

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);


  const handleFilter = (val) => {
    setValue(val);
  };

  const staff = [
    { staff_id: '1', staff_name: 'staff 1' },
    { staff_id: '2', staff_name: 'staff 2' },
    { staff_id: '3', staff_name: 'staff 3' }
  ];

  const [selectedstaff, setSelectedstaff] = useState([]);
  const [selectedstafftype, setSelectedstafftype] = useState([]);
  const stafftype = [
    { staff_id: '1', staff_name: 'stafftype 1' },
    { staff_id: '2', staff_name: 'stafftype 2' },
    { staff_id: '3', staff_name: 'stafftype 3' }
  ];

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
          <Typography sx={{ color: 'text.secondary' }}>{row.status}</Typography>
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
                text: 'Download',
                icon: <Icon icon="tabler:download" fontSize={20} />
              },
              {
                text: 'Edit',
                to: `/apps/invoice/edit/${row.id}`,
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                menuItemProps: { onClick: toggleEditUserDrawer }
              },
              {
                text: 'View',
                icon: <Icon icon="tabler:eye" fontSize={20} />,
                menuItemProps: {
                  component: Link,
                  to: `/apps/invoice/preview/${row.id}`
                
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
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    id="select-multiple-chip"
                    options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...stafftype]}
                    getOptionLabel={(option) => option.staff_name}
                    value={selectedstafftype}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                        setSelectedstafftype(staff.filter((option) => option.staff_id !== 'selectAll'));
                      } else {
                        setSelectedstafftype(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Staff Type"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.staff_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.staff_id}
                            label={option.staff_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstafftype(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    disableCloseOnSelect
                    multiple
                    id="select-multiple-chip"
                    options={[{ staff_id: 'selectAll', staff_name: 'Select All' }, ...staff]}
                    getOptionLabel={(option) => option.staff_name}
                    value={selectedstaff}
                    onChange={(e, newValue) => {
                      if (newValue && newValue.some((option) => option.staff_id === 'selectAll')) {
                        setSelectedstaff(staff.filter((option) => option.staff_id !== 'selectAll'));
                      } else {
                        setSelectedstaff(newValue);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Staffs"
                        InputProps={{
                          ...params.InputProps,
                          style: { overflowX: 'auto', maxHeight: 55, overflowY: 'hidden' }
                        }}
                      />
                    )}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                          checkedIcon={<CheckBoxIcon fontSize="small" />}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.staff_name}
                      </li>
                    )}
                    renderTags={(value) => (
                      <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', scrollbarWidth: 'none' }}>
                        {value.map((option, index) => (
                          <CustomChip
                            key={option.staff_id}
                            label={option.staff_name}
                            onDelete={() => {
                              const updatedValue = [...value];
                              updatedValue.splice(index, 1);
                              setSelectedstaff(updatedValue);
                            }}
                            color="primary"
                            sx={{ m: 0.75 }}
                          />
                        ))}
                      </div>
                    )}
                    isOptionEqualToValue={(option, value) => option.staff_id === value.staff_id}
                    selectAllText="Select All"
                    SelectAllProps={{ sx: { fontWeight: 'bold' } }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <SalaryCardHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
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
          </Card>
        </Grid>
      </Grid>
      <SalaryAddDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
      <SalaryEditDrawer open={editUserOpen} toggle={toggleEditUserDrawer} />
      <DeleteDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        description="Are you sure you want to delete this item?"
        title="Delete"
      />
    </DatePickerWrapper>
  );
};

export default SalaryTable;
