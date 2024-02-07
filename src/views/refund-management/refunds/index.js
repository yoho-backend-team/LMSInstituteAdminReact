// material-ui
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';

// project imports
import RefundTable from 'features/refund-management/refunds/components/RefundTable';
import FeesTableSkeleton from 'components/cards/Skeleton/PaymentSkeleton';

// ==============================|| SAMPLE PAGE ||============================== //

const Refunds = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay with useEffect
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
          {loading ? (
            // If data is still loading, display skeleton
            <FeesTableSkeleton />
          ) : (
            // Once data is loaded, display actual FeesTable component
            <RefundTable />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Refunds;
