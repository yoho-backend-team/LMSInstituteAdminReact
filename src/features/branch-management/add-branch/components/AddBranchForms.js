// ** React Imports

// ** MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
// ** Custom Component Import
import { Button, TextField as CustomTextField } from '@mui/material';

// ** Third Party Imports

const AddBranchForms = () => {
  // ** States
  const navigate = useNavigate();
  return (
    <Card>
      {/* <CardHeader title="Multi Column with Form Separator" />
       <Divider sx={{ m: '0 !important' }} /> */}
      <form onSubmit={(e) => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
              <CustomTextField fullWidth label=" Branch Name" placeholder="carterLeonard" />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label="Phone No." placeholder="123-456-7890" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label=" Alternate Phone No." placeholder="123-456-7890" />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField multiline rows={3} fullWidth label="Address" placeholder="1456, Liberty Street" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth type="number" label="PIN Code" placeholder="612503" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="Landmark" placeholder="Nr. Wall Street" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="City" placeholder="Kumbakonam" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label="State" placeholder="TamilNadu" />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button variant="contained">Create Branch</Button>
            </Grid>
          </Grid>
        </CardContent>
      </form>
    </Card>
  );
};

export default AddBranchForms;
