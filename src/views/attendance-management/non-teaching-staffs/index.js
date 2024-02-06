// material-ui
import { Grid } from '@mui/material';

// project imports

import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffCardHeader from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCardHeader';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';
import Pagination from '@mui/material/Pagination'
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import { useState } from 'react';
import { useEffect } from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};
const NonTeachingStaffs = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
    {loading ? (
      <TeachingStaffSkeleton />
    ) : (
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
       )}
       </>
  );
};

export default NonTeachingStaffs;
