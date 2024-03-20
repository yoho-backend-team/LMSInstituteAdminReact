import React, { useState, useEffect, useCallback } from 'react'; // Importing necessary hooks
import BranchMainSkeleton from 'components/cards/Skeleton/BranchMainSkeleton';
import { Grid } from '@mui/material';
import BranchHeader from 'features/branch-management/branch-overview-page/components/BrachesCardHeader';
import { useDispatch, useSelector } from 'react-redux';
import { selectBranches, selectLoading } from 'features/branch-management/redux/branchSelectors';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import BranchCard from 'features/branch-management/branch-overview-page/components/BranchCard';

const BranchesOverviewPage = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const branchLoading = useSelector(selectLoading);
  const [refetchBranch, setRefetchBranch] = useState(false);

  // Using useCallback to memoize the dispatch function to prevent unnecessary re-renders
  const getAllBranchesCallback = useCallback(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  useEffect(() => {
    // Call the getAllBranchesCallback function when refetchBranch changes
    getAllBranchesCallback();
  }, [getAllBranchesCallback, refetchBranch]);


  
  return (
    <Grid container spacing={1} className="match-height">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BranchHeader />
        </Grid>
        {branchLoading ? (
          <BranchMainSkeleton />
        ) : (
          branches?.map((branch, index) => (
            // Using useMemo to memoize the BranchCard component to prevent unnecessary re-renders
            <BranchCard key={index} branch={branch} setRefetchBranch={setRefetchBranch} />
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default BranchesOverviewPage;
