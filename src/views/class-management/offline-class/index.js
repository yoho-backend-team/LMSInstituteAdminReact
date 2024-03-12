// material-ui
import { Grid } from '@mui/material';
import { useEffect, useState,useMemo } from 'react';
// project imports
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';
import { selectLoading, selectOfflineClasses } from 'features/class-management/offline-classes/redux/offlineClassSelectors';
import { getAllOfflineClasses } from 'features/class-management/offline-classes/redux/offlineClassThunks';
import { useDispatch, useSelector } from 'react-redux';


const OfflineClass = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const offlineClassesLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const offlineClasses = useSelector(selectOfflineClasses);

  // Local state
  const [offlineClassRefetch, setOfflineClassRefetch] = useState(false);

  // Fetch course OfflineClass on component mount or when dependencies change
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllOfflineClasses(data));
  }, [dispatch, selectedBranchId, offlineClassRefetch]);

  // Memoize categories data to prevent unnecessary re-renders
  const memoizedOfflineClass = useMemo(() => offlineClasses?.data || [], [offlineClasses]);
  console.log(memoizedOfflineClass);

  return (
    <>
      <Grid>
        <OfflineClassFilterCard selectedBranchId={selectedBranchId} />
        <OfflineClassCardHeader setOfflineClassRefetch={setOfflineClassRefetch} />
        {offlineClassesLoading ? (
          <ClassSkeleton />
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            {memoizedOfflineClass.map((offline, index) => (
              <OfflineClassCard key={index} offline={offline} setOfflineClassRefetch={setOfflineClassRefetch} />
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default OfflineClass;
