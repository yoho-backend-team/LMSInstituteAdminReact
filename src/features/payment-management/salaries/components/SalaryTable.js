// ** React Imports
import { forwardRef, useState } from 'react';

// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// ** Icon Imports
import Icon from 'components/icon';

// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';

// ** Store & Actions Imports

// ** Utils Import
import { getInitials } from 'utils/get-initials';

// ** Custom Components Imports
import Avatar from '@mui/material/Avatar';
import CustomChip from 'components/mui/chip';
import { Link } from 'react-router-dom';

import { TextField } from '@mui/material';
import OptionsMenu from 'components/option-menu';

import SalaryCardHeader from './SalaryCardHeader';

// ** Styled Components
import DatePickerWrapper from 'styles/libs/react-datepicker';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));


// ** renders client column
const renderClient = (row) => {
  if (row.avatar.length) {
    return <Avatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />;
  } else {
    return (
      <Avatar
        skin="light"
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500, fontSize: (theme) => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </Avatar>
    );
  }
};

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}


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
    minWidth: 180,
    field: 'transactionId',
    headerName: 'Transaction ID',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.transactionid}</Typography>
    )
  },
  {
    flex: 1.25,
    minWidth: 210,
    field: 'name',
    headerName: 'Students',
    renderCell: ({ row }) => {
      const { name, companyEmail } = row;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
              {companyEmail}
            </Typography>
          </Box>
        </Box>
      );
    }
  },
  {
    flex: 1.25,
    minWidth: 180,
    field: 'total',
    headerName: 'Salary Amount',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{`$${row.total || 0}`}</Typography>
    )
  },
  {
    flex: 1.25,
    minWidth: 180,
    field: 'PaymentDate',
    headerName: 'Payment Date',
    renderCell: ({ row }) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.PaymentDate}</Typography>
    )
  },
  {
    flex: 1,
    minWidth: 180,
    field: 'balance',
    headerName: 'Balance',
    renderCell: ({ row }) => (
      row.balance !== 0 ? (
        <Typography sx={{ color: 'text.secondary' }}>{row.balance}</Typography>
      ) : (
        <CustomChip rounded size="small" skin="light" color="success" label="Paid" />
      )
    )
  },
  {
    flex: 1.25,
    minWidth: 180,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      const status = statusObj[row.status];

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status ? status.color : 'primary'}
          label={status ? status.title : 'current'}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      );
    }
  },
];




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
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [endDateRange, setEndDateRange] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // ** Hooks

  const handleFilter = (val) => {
    setValue(val);
  };

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
  };

  const handleOnChangeRange = (dates) => {
    const [start, end] = dates;
    if (start !== null && end !== null) {
      setDates(dates);
    }
    setStartDateRange(start);
    setEndDateRange(end);
  };

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 140,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Delete Invoice">
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Icon icon="tabler:trash" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View">
            <IconButton size="small" sx={{ color: 'text.secondary' }} to={`/apps/invoice/preview/${row.id}`}>
              <Icon icon="tabler:eye" />
            </IconButton>
          </Tooltip>
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
                icon: <Icon icon="tabler:edit" fontSize={20} />
              },
              {
                text: 'Duplicate',
                icon: <Icon icon="tabler:copy" fontSize={20} />
              }
            ]}
          />
        </Box>
      )
    }
  ];


   const store = [
    {
        id: 1,
        invoiceStatus: 'Sent',
        name: 'John Doe',
        companyEmail: 'john.doe@example.com',
        total: 100,
        PaymentDate: '2025-01-01',
        balance: 55,
        avatar: '',
        avatarColor: 'primary',
        transactionid:'5',
      },
    {
        id: 2,
        invoiceStatus: 'Sent',
        name: 'John Doe',
        companyEmail: 'arunbalaji.com',
        total: 200,
        PaymentDate: '2000-01-01',
        balance: 50,
        avatar: '',
        avatarColor: 'primary',
        transactionid:'12'
      },
    {
        id: 3,
        invoiceStatus: 'Sent',
        name: 'John Doe',
        companyEmail: 'john.doe@example.com',
        total: 300,
        PaymentDate: '25-01-01',
        balance: 40,
        avatar: '',
        avatarColor: 'primary',
        transactionid:'5'
      },
    {
        id: 4,
        invoiceStatus: 'Sent',
        name: 'John Doe',
        companyEmail: 'john.doe@example.com',
        total: 40,
        PaymentDate: '202-01-01',
        balance: 30,
        avatar: '',
        avatarColor: 'primary',
        transactionid:'25'
      },
    {
        id: 5,
        invoiceStatus: 'Sent',
        name: 'John Doe',
        companyEmail: 'john.doe@example.com',
        total: 50,
        PaymentDate: '20-01-01',
        balance: 0,
        avatar: '',
        avatarColor: 'primary',
        transactionid:'55'
      },



      ];
  

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Filters" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Invoice Status"
                    SelectProps={{ value: statusValue, onChange: (e) => handleStatusValue(e) }}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="downloaded">Downloaded</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="partial payment">Partial Payment</MenuItem>
                    <MenuItem value="past due">Past Due</MenuItem>
                    <MenuItem value="sent">Sent</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id="date-range-picker-months"
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput dates={dates} setDates={setDates} label="Invoice Date" end={endDateRange} start={startDateRange} />
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <SalaryCardHeader value={value} selectedRows={selectedRows} handleFilter={handleFilter} />
             <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={store}
              columns={columns}
              checkboxSelection
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default SalaryTable;
