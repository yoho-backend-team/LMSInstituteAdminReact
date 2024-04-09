import { Grid } from '@mui/material';
import BranchMainSkeleton from 'components/cards/Skeleton/BranchMainSkeleton';
import BranchHeader from 'features/branch-management/branch-overview-page/components/BrachesCardHeader';
import BranchCard from 'features/branch-management/branch-overview-page/components/BranchCard';
import { selectBranches, selectLoading } from 'features/branch-management/redux/branchSelectors';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BranchesOverviewPage = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const branchLoading = useSelector(selectLoading);
  const [refetchBranch, setRefetchBranch] = useState(false);
  const getAllBranchesCallback = useCallback(() => {
    dispatch(getAllBranches());
  }, [dispatch]);

  useEffect(() => {
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
          branches?.map((branch, index) => <BranchCard key={index} branch={branch} setRefetchBranch={setRefetchBranch} />)
        )}
      </Grid>
    </Grid>
  );
};

export default BranchesOverviewPage;
