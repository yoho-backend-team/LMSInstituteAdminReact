import { Grid } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LiveClassCard from 'features/class-management/live-classes/components/LiveClassCard';
import LiveClassCardHeader from 'features/class-management/live-classes/components/LiveClassCardHeader';
import LiveClassFilterCard from 'features/class-management/live-classes/components/LiveClassFilterCard';
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';

const useTimeout = (callback, delay) => {

  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const LiveClass = () => {
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [loading, setLoading] = useState(true);
  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const liveClasses = useSelector(selectLiveClasses);
  return (
    <>
      <Grid>
        <LiveClassFilterCard  selectedBranchId={selectedBranchId} />
        <LiveClassCardHeader selectedBranchId={selectedBranchId} setRefetch={setRefetch}/>
        {loading ? (
          <ClassSkeleton liveClasses={liveClasses}/>
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <LiveClassCard refetch={refetch} setRefetch={setRefetch}/>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default LiveClass;
