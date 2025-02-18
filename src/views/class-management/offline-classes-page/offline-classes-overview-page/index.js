import { Grid, Pagination } from '@mui/material';
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import OfflineClassCard from 'features/class-management/offline-classes/components/OfflineClassCard';
import OfflineClassCardHeader from 'features/class-management/offline-classes/components/OfflineClassCardHeader';
import OfflineClassFilterCard from 'features/class-management/offline-classes/components/OfflineClassFilterCard';
import { selectOfflineClasses, selectLoading } from 'features/class-management/offline-classes/redux/offlineClassSelectors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOfflineClasses } from 'features/class-management/offline-classes/redux/offlineClassThunks';
import { useInstitute } from 'utils/get-institute-details';
import { useSpinner } from 'context/spinnerContext';

const OfflineClass = () => {
  const [offlineClassRefetch, setofflineClassRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const offlineClasses = useSelector(selectOfflineClasses);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const {show,hide} = useSpinner()

  useEffect(() => {
    const data = {
      branch: selectedBranchId,
      institute : useInstitute().getInstituteId(),
      page: '1'
    };
    show()
    dispatch(getAllOfflineClasses(data));
    hide()
  }, [dispatch, selectedBranchId, offlineClassRefetch]);

  
  return (
    <>
      <Grid>
        <OfflineClassFilterCard selectedBranchId={selectedBranchId} />
        {loading ? (
          <ClassSkeleton />
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <OfflineClassCard
              offlineClassRefetch={offlineClassRefetch}
              setofflineClassRefetch={setofflineClassRefetch}
              offlineClasses={offlineClasses?.data}
            />
          </Grid>
        )}
        
        {offlineClasses?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={offlineClasses?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllOfflineClasses({ branch: selectedBranchId,institute:useInstitute().getInstituteId(),page: page }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default OfflineClass;
