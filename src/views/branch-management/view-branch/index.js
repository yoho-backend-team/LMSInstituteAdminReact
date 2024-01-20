import React from 'react';
// material-ui
import { Grid } from '@mui/material';

import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import BranchTableList from 'features/branch-management/add-branch/components/BranchTableList';
import HeaderCard from 'features/branch-management/view-branch/components/ViewBranchHeaderCard';
import ProgressCard from 'features/branch-management/view-branch/components/ViewBranchProgressCard';

// ==============================|| SAMPLE PAGE ||============================== //
const ViewBranch = () => {
  return (
    <Grid container spacing={4} sx={{ p: 1 }}>
      <Grid item xs={12} sm={6}>
        <HeaderCard />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProgressCard />
      </Grid>

      <Grid item xs={12}>
        <StudentTableList />
      </Grid>
      <Grid item xs={12}>
        <BranchTableList />
      </Grid>
    </Grid>
  );
};

export default ViewBranch;
