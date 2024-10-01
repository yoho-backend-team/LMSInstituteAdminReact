import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import TeachingStaffCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffCard';
import TeachingStaffFilterCard from 'features/attandence-management/teaching-staff-attandences/components/TeachingStaffFilterCard';

import {
  selectTeachingStaffAttendances,
  selectLoading
} from 'features/attandence-management/teaching-staff-attandences/redux/teachingStaffAttendanceSelectors';
import { getAllTeachingStaffAttendances } from 'features/attandence-management/teaching-staff-attandences/redux/teachingStaffAttendanceThunks';
import { use } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInstitute } from 'utils/get-institute-details';

const TeachingStaff = () => {
  const dispatch = useDispatch();
  const teachingStaffs = useSelector(selectTeachingStaffAttendances);
  const teachingStaffLoading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    const data = {
      type: 'teaching',
      branch: selectedBranchId,
      institute:useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllTeachingStaffAttendances(data));
  }, [dispatch, selectedBranchId]);
  
  return (
    <>
      <Grid>
        <Grid>
          <TeachingStaffFilterCard selectedBranchId={selectedBranchId} />
        </Grid>
        {teachingStaffLoading? (
          <TeachingStaffSkeleton />
        ) : (
          <Grid>
            <Grid className="match-height">
              <TeachingStaffCard teachingStaffs={teachingStaffs?.data} />
            </Grid>
          </Grid>
        )}
        {teachingStaffs?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={teachingStaffs?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllTeachingStaffAttendances({ branch: selectedBranchId,institute:useInstitute().getInstituteId(), page: page }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default TeachingStaff;
