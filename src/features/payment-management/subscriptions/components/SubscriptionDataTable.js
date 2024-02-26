// ** React Imports
import { forwardRef, useState } from 'react';
// ** MUI Imports
import Box from '@mui/material/Box';
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
// ** Utils Import
import { getInitials } from 'utils/get-initials';
// ** Custom Components Imports
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CustomChip from 'components/mui/chip';
import OptionsMenu from 'components/option-menu';
import { Link } from 'react-router-dom';
// ** Styled Components

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



const rows = [
    {
      id: 1,
      avatar: '8.png',
      transactionId: "Korrie O'Crevy",
      post: 'Nuclear Power Engineer',
      email: 'kocrevy0@thetimes.co.uk',
      city: 'Krasnosilka',
      issuedDate: '09/23/2016',
      balance: 23896.35,
      age: '61',
      experience: '1 Year',
      present: 2,
      absent: 1
    },
    {
      id: 7,
      avatar: '',
      transactionId: 'Eileen Diehn',
      post: 'Environmental Specialist',
      email: 'ediehn6@163.com',
      city: 'Lampuyang',
      issuedDate: '10/15/2017',
      balance: 18991.67,
      age: '59',
      experience: '9 Years',
      present: 1,
      absent: 2
    },
    {
      id: 11,
      avatar: '',
      transactionId: 'De Falloon',
      post: 'Sales Representative',
      email: 'dfalloona@ifeng.com',
      city: 'Colima',
      issuedDate: '06/12/2018',
      balance: 19252.12,
      age: '30',
      experience: '0 Year',
      present: 1,
      absent: 1
    },
    {
      id: 3,
      avatar: '7.png',
      transactionId: 'Stella Ganderton',
      post: 'Operator',
      email: 'sganderton2@tuttocitta.it',
      city: 'Golcowa',
      issuedDate: '03/24/2018',
      balance: 13076.28,
      age: '66',
      experience: '6 Years',
      present: 1,
      absent: 2
    },
    {
      id: 5,
      avatar: '',
      transactionId: 'Harmonia Nisius',
      post: 'Senior Cost Accountant',
      email: 'hnisius4@gnu.org',
      city: 'Lucan',
      issuedDate: '08/25/2017',
      balance: 10909.52,
      age: '33',
      experience: '3 Years',
      present: 2,
      absent: 1
    },
    {
      id: 6,
      avatar: '',
      transactionId: 'Genevra Honeywood',
      post: 'Geologist',
      email: 'ghoneywood5@narod.ru',
      city: 'Maofan',
      issuedDate: '06/01/2017',
      balance: 17803.8,
      age: '61',
      experience: '1 Year',
      present: 1,
      absent: 2
    },
    {
      id: 4,
      avatar: '8.png',
      transactionId: 'Dorolice Crossman',
      post: 'Cost Accountant',
      email: 'dcrossman3@google.co.jp',
      city: 'Paquera',
      issuedDate: '12/03/2017',
      balance: 12336.17,
      age: '22',
      experience: '2 Years',
      present: 2,
      absent: 1
    },
    {
      id: 8,
      avatar: '7.png',
      transactionId: 'Richardo Aldren',
      post: 'Senior Sales Associate',
      email: 'raldren7@mtv.com',
      city: 'Skoghall',
      issuedDate: '11/05/2016',
      balance: 19230.13,
      age: '55',
      experience: '5 Years',
      absent: 1,
      present: 2
    },
    {
      id: 9,
      avatar: '2.png',
      transactionId: 'Allyson Moakler',
      post: 'Safety Technician',
      email: 'amoakler8@shareasale.com',
      city: 'Mogilany',
      issuedDate: '12/29/2018',
      balance: 11677.32,
      age: '39',
      experience: '9 Years',
      present: 1,
      absent: 2
    },
    {
      id: 10,
      avatar: '7.png',
      transactionId: 'Merline Penhalewick',
      post: 'Junior Executive',
      email: 'mpenhalewick9@php.net',
      city: 'Kanuma',
      issuedDate: '04/19/2019',
      balance: 15939.52,
      age: '23',
      experience: '3 Years',
      present: 2,
      absent: 1
    },
    {
      id: 12,
      avatar: '',
      transactionId: 'Cyrus Gornal',
      post: 'Senior Sales Associate',
      email: 'cgornalb@fda.gov',
      city: 'Boro Utara',
      issuedDate: '12/09/2017',
      balance: 16745.47,
      age: '22',
      experience: '2 Years',
      present: 2,
      absent: 1
    },
    {
      id: 13,
      avatar: '',
      transactionId: 'Tallou Balf',
      post: 'Staff Accountant',
      email: 'tbalfc@sina.com.cn',
      city: 'Siliana',
      issuedDate: '01/21/2016',
      balance: 15488.53,
      age: '36',
      experience: '6 Years',
      present: 1,
      absent: 2
    },
    {
      id: 14,
      avatar: '',
      transactionId: 'Othilia Extill',
      post: 'Associate Professor',
      email: 'oextilld@theatlantic.com',
      city: 'Brzyska',
      issuedDate: '02/01/2016',
      balance: 18442.34,
      age: '43',
      experience: '3 Years',
      present: 2,
      absent: 1
    },
    {
      id: 15,
      avatar: '',
      transactionId: 'Wilmar Bourton',
      post: 'Administrative Assistant',
      email: 'wbourtone@sakura.ne.jp',
      city: 'Bích Động',
      issuedDate: '04/25/2018',
      balance: 13304.45,
      age: '19',
      experience: '9 Years',
      present: 2,
      absent: 1
    },
    {
      id: 16,
      avatar: '4.png',
      transactionId: 'Robinson Brazenor',
      post: 'General Manager',
      email: 'rbrazenorf@symantec.com',
      city: 'Gendiwu',
      issuedDate: '12/23/2017',
      balance: 11953.08,
      age: '66',
      experience: '6 Years',
      present: 2,
      absent: 1
    },
    {
      id: 17,
      avatar: '',
      transactionId: 'Nadia Bettenson',
      post: 'Environmental Tech',
      email: 'nbettensong@joomla.org',
      city: 'Chabařovice',
      issuedDate: '07/11/2018',
      balance: 20484.44,
      age: '64',
      experience: '4 Years',
      present: 1,
      absent: 2
    },
    {
      id: 18,
      avatar: '',
      transactionId: 'Titus Hayne',
      post: 'Web Designer',
      email: 'thayneh@kickstarter.com',
      city: 'Yangon',
      issuedDate: '05/25/2019',
      balance: 16871.48,
      age: '59',
      experience: '9 Years',
      present: 1,
      absent: 2
    },
    {
      id: 19,
      avatar: '4.png',
      transactionId: 'Roxie Huck',
      post: 'Administrative Assistant',
      email: 'rhucki@ed.gov',
      city: 'Polýkastro',
      issuedDate: '04/04/2019',
      balance: 19653.56,
      age: '41',
      experience: '1 Year',
      present: 2,
      absent: 1
    },
    {
      id: 20,
      transactionId:21235,
      avatar: '7.png',
     
      post: 'Actuary',
      email: 'llewteyj@sun.com',
      city: 'Hougong',
      issuedDate: '08/03/2017',
      balance: 18303.87,
      age: '35',
      experience: '5 Years',
      present: 1,
      absent: 1
    },
  ];
/* eslint-enable */
const SubscriptionDataTable = () => {
  // ** State


 
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const handleStatusChange = () => {
    setDeleteDialogOpen(true);
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
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.transactionid}</Typography>
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
      minWidth: 120,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.total || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row.issuedDate}</Typography>
    },
    {
      flex: 1,
      minWidth: 130,
      field: 'balance',
      headerName: 'Balance',
      renderCell: ({ row }) =>
        row.balance !== 0 ? (
          <Typography sx={{ color: 'text.secondary' }}>{row.balance}</Typography>
        ) : (
          <CustomChip rounded size="small" skin="light" color="success" label="Paid" />
        )
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <TextField size="small" select defaultValue="" label="status" id="custom-select" onChange={(e) => handleStatusChange(e, row)}>
            <MenuItem value={10}>{row.balance}</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </TextField>
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
                icon: <Icon icon="tabler:edit" fontSize={20} />,
                // menuItemProps: { onClick: toggleEditUserDrawer }
              }
            ]}
          />
        </Box>
      )
    }
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
          <DataGrid
            sx={{ p: 2 }}
            autoHeight
            pagination
            rowHeight={62}
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
          />
      </Grid>
    </Grid>
  );
};

export default SubscriptionDataTable;
