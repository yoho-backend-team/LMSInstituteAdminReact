// material-ui
import { Grid } from '@mui/material';
// project imports
import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import TeachingStaffCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCard';
import TeachingStaffFilterCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffFilterCard';
import { useEffect, useState } from 'react';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const TeachingStaff = () => {

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
      <TeachingStaffFilterCard />
      <Grid className="match-height">
        <TeachingStaffCard />
      </Grid>
      <Grid sx={{mt:2,display:"flex",justifyContent:"flex-end"}} >
      <Pagination count={10} color='primary' />
      </Grid>
    </Grid>
    )}
    </>
  );
};

export default TeachingStaff;
