// material-ui
import { Grid, Typography } from '@mui/material';
import AddBathFormInputs from 'features/batch-management/add-batch/components/AddBatchForms';
import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import DatePickerWrapper from 'styles/libs/react-datepicker';

// ==============================|| SAMPLE PAGE ||============================== //

const AddBatchPage = () => (
  <Grid container spacing={4} sx={{ p: 1 }}>
    <Grid item xs={12}>
      <Typography variant="h3">Create a new batch</Typography>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Typography variant="h4">Details</Typography>
      <Typography sx={{ color: 'text.secondary' }}>Name, start date, end date</Typography>
    </Grid>
    <Grid item xs={12} sm={9}>
      <DatePickerWrapper>
        <AddBathFormInputs />
      </DatePickerWrapper>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h4">Students List</Typography>
      <Typography sx={{ color: 'text.secondary' }}>Check, remove student</Typography>
    </Grid>
    <Grid item xs={12}>
      <StudentTableList />
    </Grid>
  </Grid>
);

export default AddBatchPage;
