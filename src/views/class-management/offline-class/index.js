// material-ui
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

// project imports

import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';

// ==============================|| SAMPLE PAGE ||============================== //

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};


const OfflineClass = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  return(
    <>
    {loading ? (
      <ClassSkeleton />
    ) : (
      <Grid>
        <OfflineClassFilterCard />
        <OfflineClassCardHeader />
        <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
          <OfflineClassCard /> 
        </Grid>
      </Grid>
      )}
    </>
  );
};

export default OfflineClass;
