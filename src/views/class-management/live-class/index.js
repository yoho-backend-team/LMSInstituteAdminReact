// material-ui
import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
// project imports
import LiveClassCard from 'features/class-management/live-classes/components/LiveClassCard';
import LiveClassCardHeader from 'features/class-management/live-classes/components/LiveClassCardHeader';
import LiveClassFilterCard from 'features/class-management/live-classes/components/LiveClassFilterCard';
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const LiveClass = () => {
  const [loading, setLoading] = useState(true);
  useTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
      {loading ? (
        <ClassSkeleton />
      ) : (
        <Grid>
          <LiveClassFilterCard />
          <LiveClassCardHeader />
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <LiveClassCard />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default LiveClass;
