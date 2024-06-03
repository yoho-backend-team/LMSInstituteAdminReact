import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StudentAttendanceSkeleton from 'components/cards/Skeleton/StudentAttendance';
import StudentAttendanceCard from 'features/attandence-management/student-attandences/components/StudentAttendanceCard';
import StudentAttendanceFilterCard from 'features/attandence-management/student-attandences/components/StudentAttendanceFilterCard';
import { getAllStudentAttendances } from 'features/attandence-management/student-attandences/redux/studentAttendanceThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStudentAttendances,
  selectLoading
} from 'features/attandence-management/student-attandences/redux/studentAttendanceSelectors';
import { useInstitute } from 'utils/get-institute-details';
const Students = () => {
  // States

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();
  const studentAttendance = useSelector(selectStudentAttendances);

  const loading = useSelector(selectLoading);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStudentAttendances({ branch_id: selectedBranchId,institute_id:useInstitute().getInstituteId(), page: '1' }));
  }, [selectedBranchId, dispatch, refetch]);

  return (
    <>
      <Grid>
        <Grid>
          <StudentAttendanceFilterCard selectedBranchId={selectedBranchId} setRefetch={setRefetch} />
        </Grid>
        {loading ? (
          <StudentAttendanceSkeleton />
        ) : (
          <Grid>
            <Grid className="match-height" sx={{ marginTop: 3 }}>
              <StudentAttendanceCard studentAttendance={studentAttendance?.data} />
            </Grid>
          </Grid>
        )}
        {studentAttendance?.last_page !== 1 && (
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={studentAttendance?.last_page}
              color="primary"
              onChange={(e, page) => {
                dispatch(getAllStudentAttendances({ branch_id: selectedBranchId, page: page,institute_id:useInstitute().getInstituteId() }));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Students;
