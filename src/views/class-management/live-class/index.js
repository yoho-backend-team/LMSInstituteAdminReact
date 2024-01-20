// material-ui
import { Grid } from '@mui/material';
// project imports

import LiveClassCard from 'features/class-management/live-classes/components/LiveClassCard';
import LiveClassCardHeader from 'features/class-management/live-classes/components/LiveClassCardHeader';
import LiveClassFilterCard from 'features/class-management/live-classes/components/LiveClassFilterCard';

// ==============================|| SAMPLE PAGE ||============================== //

const LiveClass = () => {
  return (
    <>
      <Grid>
        <LiveClassFilterCard />
        <LiveClassCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <LiveClassCard />
        </Grid>
      </Grid>
    </>
  );
};

export default LiveClass;
