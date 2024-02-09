// material-ui
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

// project imports
// import MainCard from 'components/cards/MainCard';
import BranchCard from 'features/branch-management/branches/components/branchcard';
import BranchMainSkeleton from 'components/cards/Skeleton/BranchMainSkeleton';
// ==============================|| SAMPLE PAGE ||============================== //

const Branches = () => {
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
