// material-ui
import { Grid } from '@mui/material';

import StudentTableList from 'features/batch-management/add-batch/components/StudentTableList';
import HeaderCard from 'features/batch-management/view-batch/components/ViewBatchHeaderCard';
import ProgressCard from 'features/batch-management/view-batch/components/ViewBatchProgressCard';

// ==============================|| SAMPLE PAGE ||============================== //

const ViewBatch = () => (
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
);

export default ViewBatch;
