// material-ui
import { Grid } from '@mui/material';
// project imports

import Pagination from '@mui/material/Pagination';
import StudentAttendanceSkeleton from 'components/cards/Skeleton/StudentAttendance';
import StudentAttendanceCard from 'features/attandence-management/student-attandences/components/StudentAttendanceCard';
import StudentAttendanceFilterCard from 'features/attandence-management/student-attandences/components/StudentAttendanceFilterCard';
import { useEffect, useState } from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const Students = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
     {loading ? (
        <StudentAttendanceSkeleton />
      ) : (
      <Grid >
        <StudentAttendanceFilterCard />
        <Grid item spacing={2} className="match-height" sx={{ marginTop: 3 }}>
          <StudentAttendanceCard />
        </Grid>
        <Grid sx={{mt:2,display:"flex",justifyContent:"flex-end"}} >
      <Pagination count={10} color='primary' />
      </Grid>
      </Grid>
      )}
    </>
  );
};

export default Students;
