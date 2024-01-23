// material-ui
import { Grid } from '@mui/material';

// project imports

import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffCardHeader from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCardHeader';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';

// ==============================|| SAMPLE PAGE ||============================== //

const NonTeachingStaffs = () => {
  return (
    <Grid>
      <NonTeachingStaffFilterCard />
      <NonTeachingStaffCardHeader />
      <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
        <NonTeachingStaffCard />
      </Grid>
    </Grid>
  );
};

export default NonTeachingStaffs;
