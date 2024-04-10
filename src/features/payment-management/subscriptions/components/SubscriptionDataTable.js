import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// ** Styled component for the link in the dataTable
const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  fontSize: theme.typography.body1.fontSize,
  color: `${theme.palette.primary.main} !important`
}));

const SubscriptionDataTable = ({ Subscription }) => {
  // ** State
  console.log('Subscription :', Subscription);

  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const Columns = [
    {
      flex: 0.1,
      minWidth: 100,
      field: 'id',
      headerName: 'ID',
      renderCell: ({ row }) => (
        <Typography component={LinkStyled} to={`/apps/invoice/preview/${row.id}`}>
          {`#${row?.id}`}
        </Typography>
      )
    },
    {
      flex: 1.25,
      minWidth: 140,
      field: 'plan',
      headerName: 'Plan',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary' }}>{row?.transaction_id}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 120,
      field: 'total',
      headerName: 'Amount Paid',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.paid_amount || 0}`}</Typography>
    },
    {
      flex: 1.25,
      minWidth: 150,
      field: 'issuedDate',
      headerName: 'Issued Date',
      renderCell: ({ row }) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.start_date} - {row.end_date}
        </Typography>
      )
    },
    {
      flex: 1.25,
      minWidth: 120,
      field: 'price',
      headerName: 'price',
      renderCell: ({ row }) => <Typography sx={{ color: 'text.secondary', ml: 2 }}>{`$${row.price || 0}`}</Typography>
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
          rows={Subscription}
          columns={Columns}
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

SubscriptionDataTable.propTypes = {
  Subscription: PropTypes.any
};
export default SubscriptionDataTable;
