// material-ui
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
// project imports
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';
import { useSelector } from 'react-redux';
import { selectLiveClasses } from 'features/class-management/live-classes/redux/liveClassSelectors';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const OfflineClass = () => {
  const [loading, setLoading] = useState(true);
  const [offlineClassRefetch, setofflineClassRefetch] = useState(false);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const liveClasses = useSelector(selectLiveClasses);
  return (
    <>
      <Grid>
        <OfflineClassFilterCard selectedBranchId={selectedBranchId}/>
        <OfflineClassCardHeader selectedBranchId={selectedBranchId} setRefetch={setofflineClassRefetch}/>
        {loading ? (
          <ClassSkeleton liveClasses={liveClasses}/>
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <OfflineClassCard offlineClassRefetch={offlineClassRefetch} setofflineClassRefetch={setofflineClassRefetch}/>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default OfflineClass;
