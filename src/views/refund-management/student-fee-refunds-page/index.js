// material-ui
import { Grid } from '@mui/material';
// project imports
import RefundTable from 'features/refund-management/refunds/components/RefundTable';

const Refunds = () => {

  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
           <RefundTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Refunds;
