import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import TeachingStaffCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCard';
import TeachingStaffFilterCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffFilterCard';
import { selectLoading, selectTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffSelectors';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TeachingStaff = () => {
  const dispatch = useDispatch();
  const teachingStaffs = useSelector(selectTeachingStaffs);
  const teachingstaffLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      type: 'teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId]);

  return (
    <>
      <Grid>
        <Grid>
          <TeachingStaffFilterCard selectedBranchId={selectedBranchId} />
        </Grid>
        {teachingstaffLoading ? (
          <TeachingStaffSkeleton />
        ) : (
          <Grid>
            <Grid className="match-height">
              <TeachingStaffCard teachingStaffs={teachingStaffs} />
            </Grid>
            <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Pagination count={10} color="primary" />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default TeachingStaff;
