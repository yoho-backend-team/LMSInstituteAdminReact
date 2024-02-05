// material-ui
import { Grid } from '@mui/material';
// project imports

import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';

// ==============================|| SAMPLE PAGE ||============================== //

const OfflineClass = () => {
  return (
    <>
      <Grid>
        <OfflineClassFilterCard />
        <OfflineClassCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <OfflineClassCard /> 
        </Grid>
      </Grid>
    </>
  );
};

export default OfflineClass;
