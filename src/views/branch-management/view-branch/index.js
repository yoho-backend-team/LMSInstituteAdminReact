import { Grid } from '@mui/material';
import BranchSkeleton from 'components/cards/Skeleton/BranchSkeleton';
import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import BranchTableList from 'features/branch-management/add-branch/components/BranchTableList';
import HeaderCard from 'features/branch-management/view-branch/components/ViewBranchHeaderCard';
import ProgressCard from 'features/branch-management/view-branch/components/ViewBranchProgressCard';
import { useEffect, useState } from 'react';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewBranch = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <BranchSkeleton />
      ) : (
        <Grid container spacing={4} sx={{ p: 1 }}>
          <Grid item xs={12} sm={6}>
            <HeaderCard />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProgressCard />
          </Grid>
          <Grid item xs={12}>
            <BranchTableList />
          </Grid>
          <Grid item xs={12}>
            <StudentTableList />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewBranch;
