// material-ui
import { Grid } from '@mui/material';
// project imports
import OnlineClassFilterCard from 'features/class-management/online-classes/components/OnlineClassFilterCard';
import OnlineClassCardHeader from 'features/class-management/online-classes/components/OnlineClassCardHeader';
import OnlineClassCard from 'features/class-management/online-classes/components/OnlineClassCard';

// ==============================|| SAMPLE PAGE ||============================== //

const OnlineClass = () => {
  return (
    <>
      <Grid>
        <OnlineClassFilterCard />
        <OnlineClassCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <OnlineClassCard />
        </Grid>
      </Grid>
    </>
  );
};

export default OnlineClass;
