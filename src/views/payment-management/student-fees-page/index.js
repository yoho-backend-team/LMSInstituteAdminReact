// material-ui
import { Grid } from '@mui/material';
// project imports
import FeesTable from 'features/payment-management/fees/components/FeesTable';

const Fee = () => {
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          <FeesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Fee;
