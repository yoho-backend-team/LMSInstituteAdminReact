import { Grid, Typography,  } from '@mui/material';
import AddBranchForms from 'features/branch-management/branch-add-page/components/AddBranchForms';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const AddBranch = () => {
  return (
    <Grid container spacing={16} sx={{ p: 1,  backgroundColor: '#f9f9f9', minHeight: '100vh', alignContent:'center' , justifyContent:'center'}}>
      <Grid item xs={10} lg={12}>
        <Typography variant="h3" sx={{ mt:0,fontWeight: 'bold', mb: 1 }}>
          Create a New Branch
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary',mb: 1  }}>
          Fill in the details below to add a new branch.
        </Typography>
        <DatePickerWrapper>
          <AddBranchForms />
        </DatePickerWrapper>
      </Grid>
    </Grid>
  );
};

export default AddBranch;
