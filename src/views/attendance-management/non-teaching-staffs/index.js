// material-ui
import { Grid } from '@mui/material';

// project imports

import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffCardHeader from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCardHeader';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';
import Pagination from '@mui/material/Pagination'

// ==============================|| SAMPLE PAGE ||============================== //

const NonTeachingStaffs = () => {
  return (
    <Grid>
      <NonTeachingStaffFilterCard />
      <NonTeachingStaffCardHeader />
      <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
        <NonTeachingStaffCard />
      </Grid>
      <Grid sx={{mt:2,display:"flex",justifyContent:"flex-end"}} >
      <Pagination count={10} color='primary' />
      </Grid>
    </Grid>
  );
};

export default NonTeachingStaffs;
