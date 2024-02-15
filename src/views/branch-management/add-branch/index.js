import { Grid, Typography } from '@mui/material';
import AddBranchForms from 'features/branch-management/add-branch/components/AddBranchForms';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const AddBranch = () => {
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Typography variant="h3">Create a new branch</Typography>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Typography variant="h4">Details</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Name, phone, address</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <DatePickerWrapper>
          <AddBranchForms />
        </DatePickerWrapper>
      </Grid>
    </Grid>
  );
};

export default AddBranch;
