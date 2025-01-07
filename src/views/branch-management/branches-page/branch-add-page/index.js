import { Grid, Typography, Card, CardContent } from '@mui/material';
import AddBranchForms from 'features/branch-management/branch-add-page/components/AddBranchForms';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const AddBranch = () => {
  return (
    <Grid container spacing={4} sx={{ p: 3, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Grid item xs={12}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Create a New Branch
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Fill in the details below to add a new branch.
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 1 }}>
              Branch Details
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Provide the branch name, phone number, and address.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Card >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>
              Fill the Form
            </Typography>
            <DatePickerWrapper>
              <AddBranchForms />
            </DatePickerWrapper>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AddBranch;
