// material-ui
import { Grid } from '@mui/material';
// project imports
import RefundTable from 'features/refund-management/refunds/components/RefundTable';
// ==============================|| SAMPLE PAGE ||============================== //

const Refunds = () => {
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <RefundTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Refunds;
