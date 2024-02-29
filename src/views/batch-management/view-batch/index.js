// material-ui
import { Grid } from '@mui/material';
import BatchViewSkeleton from 'components/cards/Skeleton/BatchViewSkeleton';
import ViewBatchTable from 'features/batch-management/view-batch/components/ViewBatchTable';
import HeaderCard from 'features/batch-management/view-batch/components/ViewBatchHeaderCard';
import { useEffect, useState } from 'react';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewBatch = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <BatchViewSkeleton />
      ) : (
        <Grid container spacing={3} sx={{ p: 1 }}>
          <Grid item xs={12} sm={12}>
            <HeaderCard />
          </Grid>

          <Grid item xs={12}>
            <ViewBatchTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewBatch;
