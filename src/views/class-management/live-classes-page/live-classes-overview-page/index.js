import { Button, Grid, Pagination } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LiveClassCard from 'features/class-management/live-classes/components/LiveClassCard';
import LiveClassFilterCard from 'features/class-management/live-classes/components/LiveClassFilterCard';
import ClassSkeleton from 'components/cards/Skeleton/ClassSkeleton';
import { selectLiveClasses, selectLoading } from 'features/class-management/live-classes/redux/liveClassSelectors';
import { getAllLiveClasses } from 'features/class-management/live-classes/redux/liveClassThunks';
import { useInstitute } from 'utils/get-institute-details';
import LiveClassSkeleton from 'components/cards/Skeleton/LiveclassSkeleton';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

const LiveClass = () => {
  const navigate = useNavigate();
  const [refetch, setRefetch] = useState(false);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const liveClasses = useSelector(selectLiveClasses);

  useEffect(() => {
    const data = {
      branch: selectedBranchId,
      institute: useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllLiveClasses(data));
  }, [dispatch, selectedBranchId, refetch]);
  console.log(liveClasses, 'liveClasses');
  return (
    <>
      <Grid>
        <Button variant="contained" onClick={() => navigate('/class-management/offline-classes')}>
          <IconArrowLeft stroke={2}/>
        </Button>
        <LiveClassFilterCard selectedBranchId={selectedBranchId} />
        {loading ? (
          <LiveClassSkeleton liveClasses={liveClasses?.data} />
        ) : (
          <Grid container spacing={1} className="match-height" sx={{ marginTop: 3 }}>
            <LiveClassCard refetch={refetch} setRefetch={setRefetch} liveClasses={liveClasses?.data} />
          </Grid>
        )}
        {liveClasses?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={liveClasses?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllLiveClasses({ branch: selectedBranchId, page: page, institute: useInstitute().getInstituteId() }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default LiveClass;
