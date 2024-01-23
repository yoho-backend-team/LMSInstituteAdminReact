// material-ui
import { Grid } from '@mui/material';

// project imports

import TeachingStaffCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCard';
import TeachingStaffCardHeader from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCardHeader';
import TeachingStaffFilterCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffFilterCard';
// ==============================|| SAMPLE PAGE ||============================== //

const TeachingStaff = () => {
  return (
    <Grid>
      <TeachingStaffFilterCard />
      <TeachingStaffCardHeader />
      <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
        <TeachingStaffCard />
      </Grid>
    </Grid>
  );
};

export default TeachingStaff;
