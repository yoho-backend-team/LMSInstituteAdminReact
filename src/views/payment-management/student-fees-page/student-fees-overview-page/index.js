import { Grid } from '@mui/material';
import FeesTable from 'features/payment-management/fees/components/FeesTable';

const Fee = () => {
  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12} sm={12}>
          <FeesTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Fee;
