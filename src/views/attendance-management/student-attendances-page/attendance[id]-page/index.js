// material-ui
import { Grid } from '@mui/material';
import BatchViewSkeleton from 'components/cards/Skeleton/BatchViewSkeleton';
import { useEffect, useState } from 'react';


import StudentAttendanceTable from 'features/attandence-management/student-attandences/components/StudentAttendanceTable';
import StudentViewHeaderCard from 'features/attandence-management/student-attandences/components/StudentViewHeaderCard';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewAttendance = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <BatchViewSkeleton />
      ) : (
        <Grid container spacing={3} sx={{ p: 1 }}>
          <Grid item xs={12} sm={12}>
            <StudentViewHeaderCard />
          </Grid>

          <Grid item xs={12}>
            <StudentAttendanceTable />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewAttendance;
