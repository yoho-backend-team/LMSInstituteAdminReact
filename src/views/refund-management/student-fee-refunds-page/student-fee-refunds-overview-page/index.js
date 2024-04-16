import { Grid } from '@mui/material';
import RefundTable from 'features/refund-management/refunds/components/RefundTable';

const Refunds = () => {
  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid item xs={12}>
          <RefundTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Refunds;
