// material-ui
import { Grid } from '@mui/material';
import BatchViewSkeleton from 'components/cards/Skeleton/BatchViewSkeleton';
import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import HeaderCard from 'features/batch-management/view-batch/components/ViewBatchHeaderCard';
import ProgressCard from 'features/batch-management/view-batch/components/ViewBatchProgressCard';
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
          <Grid item xs={12} sm={6}>
            <HeaderCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProgressCard />
          </Grid>

          <Grid item xs={12}>
            <StudentTableList />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewBatch;
