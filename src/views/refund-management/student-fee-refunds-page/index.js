// material-ui
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
// project imports
import RefundTable from 'features/refund-management/refunds/components/RefundTable';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';

const Refunds = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height">
          {loading ? <FeesTableSkeleton /> : <RefundTable />}
        </Grid>
      </Grid>
    </>
  );
};

export default Refunds;
