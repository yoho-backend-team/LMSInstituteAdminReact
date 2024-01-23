// material-ui
import { Grid } from '@mui/material';
// project imports

import StudentAttendanceCard from 'features/attandence-management/student-attandences/components/StudentAttendanceCard';
import StudentAttendanceCardHeader from 'features/attandence-management/student-attandences/components/StudentAttendanceCardHeader';
import StudentAttendanceFilterCard from 'features/attandence-management/student-attandences/components/StudentAttendanceFilterCard';
// ==============================|| SAMPLE PAGE ||============================== //

const Students = () => {
  return (
    <>
      <Grid>
        <StudentAttendanceFilterCard />
        <StudentAttendanceCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <StudentAttendanceCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Students;
