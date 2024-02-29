import React, { useState, useEffect } from 'react';
import BranchMainSkeleton from 'components/cards/Skeleton/BranchMainSkeleton';
import { Grid } from '@mui/material';
import BranchHeader from 'features/branch-management/branch-overview-page/components/BrachesCardHeader';
import BranchEditModal from 'features/branch-management/branch-overview-page/components/edit-Branch/BranchEditModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectBranches, selectLoading } from 'features/branch-management/redux/branchSelectors';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import BranchCard from 'features/branch-management/branch-overview-page/components/BranchCard';
const Branches = () => {
  const dispatch = useDispatch();
  const branches = useSelector(selectBranches);
  const branchLoading = useSelector(selectLoading);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [refetchBranch, setRefetchBranch] = useState(false);
  console.log('branches', branches);

  useEffect(() => {
    dispatch(getAllBranches());
  }, [dispatch, refetchBranch]);

  const handleEditClose = () => {
    setEditModalOpen(false);
  };

  return (
    <Grid container spacing={1} className="match-height">
      {branchLoading ? (
        <BranchMainSkeleton />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BranchHeader />
          </Grid>
          {branches?.map((branch, index) => (
            <BranchCard key={index} branch={branch} setSelectedBranch={setSelectedBranch} setEditModalOpen={setEditModalOpen} />
          ))}
          <BranchEditModal
            open={isEditModalOpen}
            handleEditClose={handleEditClose}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            setRefetchBranch={setRefetchBranch}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Branches;
