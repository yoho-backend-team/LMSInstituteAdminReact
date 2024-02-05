import React from 'react';
import { Grid, Card, CardContent, TextField, MenuItem } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import DatePicker from 'react-datepicker';
import { DataGrid } from '@mui/x-data-grid';

// ==============================|| SKELETON - FEES TABLE ||============================== //

// Skeleton for CustomInput component used in the DatePicker
const CustomInputSkeleton = () => <Skeleton variant="rectangular" height={40} />;

// Skeleton for FeesTable component
const FeesTableSkeleton = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeaderSkeleton title="Filters" />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <TextFieldSkeleton fullWidth label="Invoice Status" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerSkeleton />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <FeesCardHeaderSkeleton />
          <DataGridSkeleton />
        </Card>
      </Grid>
    </Grid>
  );
};

// Skeleton for CardHeader component with a title
const CardHeaderSkeleton = () => (
  <CardContent>
    <Skeleton variant="rectangular" height={40} width="50%" />
  </CardContent>
);

// Skeleton for FeesCardHeader component
const FeesCardHeaderSkeleton = () => (
  <Card>
    <CardHeaderSkeleton title="Filters" />
    <CardContent>
      <Skeleton variant="rectangular" height={40} />
    </CardContent>
  </Card>
);

// Skeleton for DataGrid component
const DataGridSkeleton = () => (
  <DataGrid
    autoHeight
    pagination
    rowHeight={62}
    rows={[]}
    columns={[]}
    disableRowSelectionOnClick
    pageSizeOptions={[10, 25, 50]}
    paginationModel={{ page: 0, pageSize: 10 }}
    onPaginationModelChange={() => {}}
    onRowSelectionModelChange={() => {}}
  />
);

// Skeleton for TextField component
const TextFieldSkeleton = ({ fullWidth, label }) => (
  <TextField
    select
    fullWidth={fullWidth}
    label={label}
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    <MenuItem value="downloaded">Downloaded</MenuItem>
    <MenuItem value="draft">Draft</MenuItem>
    <MenuItem value="paid">Paid</MenuItem>
    <MenuItem value="partial payment">Partial Payment</MenuItem>
    <MenuItem value="past due">Past Due</MenuItem>
    <MenuItem value="sent">Sent</MenuItem>
  </TextField>
);

// Skeleton for DatePicker component
const DatePickerSkeleton = () => (
  <DatePicker
    isClearable
    selectsRange
    monthsShown={2}
    endDate={null}
    selected={null}
    startDate={null}
    shouldCloseOnSelect={false}
    id="date-range-picker-months"
    onChange={() => {}}
    customInput={<CustomInputSkeleton />}
  />
);

export default FeesTableSkeleton;
