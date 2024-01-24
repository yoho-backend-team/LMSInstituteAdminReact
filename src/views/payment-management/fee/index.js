// material-ui
import { Grid } from '@mui/material';
// project imports
import FeesTable from 'features/payment-management/fees/components/FeesTable';

// ==============================|| SAMPLE PAGE ||============================== //

const Fee = () => {
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <FeesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Fee;
