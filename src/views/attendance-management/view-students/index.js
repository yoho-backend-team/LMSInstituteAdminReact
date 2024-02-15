// material-ui
import { Grid } from '@mui/material';
// project imports
import AttendanceTable from 'features/attandence-management/student-attandences/components/AttendanceTable';

const Fee = () => {
  return (
    <>
      <Grid>
        <Grid spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <AttendanceTable />
        </Grid>
      </Grid>
    </>
  );
};

export default Fee;
