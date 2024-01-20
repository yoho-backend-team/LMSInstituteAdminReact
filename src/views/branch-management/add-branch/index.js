import React from 'react';
import { Grid, Typography } from '@mui/material';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import AddBranchForms from 'features/branch-management/add-branch/components/AddBranchForms';
import BranchTableList from 'features/branch-management/add-branch/components/BranchTableList';

const AddBranch = () => {
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create a new branch</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h4">Details</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Name, start date, end date</Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <DatePickerWrapper>
          <AddBranchForms />
        </DatePickerWrapper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Course List</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Check, remove Course</Typography>
      </Grid>
      <Grid item xs={12}>
        <BranchTableList />
      </Grid>
    </Grid>
  );
};

export default AddBranch;
