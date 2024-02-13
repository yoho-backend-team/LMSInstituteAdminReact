// material-ui
import { Grid } from '@mui/material';

// project imports

import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';
import { useEffect, useState } from 'react';
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
      {/* <NonTeachingStaffCardHeader /> */}
    
        <NonTeachingStaffCard />

      <Grid sx={{mt:2,display:"flex",justifyContent:"flex-end"}} >
      <Pagination count={10} color='primary' />
      </Grid>
    </Grid>
       )}
       </>
  );
};

export default NonTeachingStaffs;
