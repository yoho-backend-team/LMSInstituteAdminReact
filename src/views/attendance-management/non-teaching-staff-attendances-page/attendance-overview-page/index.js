// material-ui
import { Grid } from '@mui/material';
// project imports
import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);
    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const NonTeachingStaffs = () => {
  const [loading, setLoading] = useState(true);
  useTimeout(() => {
    setLoading(false);
  }, 1000);

  const nonTeachingStaffs = useSelector(selectTeachingStaffs);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'non_teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId]);
  return (
    <>
      {loading ? (
        <TeachingStaffSkeleton />
      ) : (
        <Grid>
          <NonTeachingStaffFilterCard />
          <NonTeachingStaffCard nonTeachingStaffs={nonTeachingStaffs} />
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={10} color="primary" />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default NonTeachingStaffs;
