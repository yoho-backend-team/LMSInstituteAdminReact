import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import BranchCard from 'features/branch-management/branches/components/branchcard';
import BranchMainSkeleton from 'components/cards/Skeleton/BranchMainSkeleton';

const Branches = () => {
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
          {loading ? (
            <BranchMainSkeleton />
          ) : (
            <Grid container className="match-height" sx={{ marginTop: 0 }}>
              <BranchCard />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Branches;
