import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import TeachingStaffSkeleton from 'components/cards/Skeleton/TeachingStaffSkeleton';
import NonTeachingStaffCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffCard';
import NonTeachingStaffFilterCard from 'features/attandence-management/non-teaching-staff-attandences/components/NonTeachingStaffFilterCard';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectLoading,
  selectNonTeachingStaffAttendances
} from 'features/attandence-management/non-teaching-staff-attandences/redux/nonTeachingStaffAttendanceSelectors';
import { getAllNonTeachingStaffAttendances } from 'features/attandence-management/non-teaching-staff-attandences/redux/nonTeachingStaffAttendanceThunks';
import { useInstitute } from 'utils/get-institute-details';

const NonTeachingStaffs = () => {
  const nonTeachingStaffs = useSelector(selectNonTeachingStaffAttendances);
  const loading = useSelector(selectLoading);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type: 'non_teaching',
      branch: selectedBranchId,
      institute : useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllNonTeachingStaffAttendances(data));
  }, [dispatch, selectedBranchId]);

  return (
    <>
      <Grid>
        <NonTeachingStaffFilterCard selectedBranchId={selectedBranchId} />
        {loading ? (
          <TeachingStaffSkeleton />
        ) : (
          <div>
            <NonTeachingStaffCard nonTeachingStaffs={nonTeachingStaffs?.data} />
          </div>
        )}
        {nonTeachingStaffs?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={nonTeachingStaffs?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllNonTeachingStaffAttendances({ branch: selectedBranchId, page: page,institute:useInstitute().getInstituteId() }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default NonTeachingStaffs;
