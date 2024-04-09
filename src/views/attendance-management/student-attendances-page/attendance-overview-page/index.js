import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import StudentAttendanceSkeleton from 'components/cards/Skeleton/StudentAttendance';
import StudentAttendanceCard from 'features/attandence-management/student-attandences/components/StudentAttendanceCard';
import StudentAttendanceFilterCard from 'features/attandence-management/student-attandences/components/StudentAttendanceFilterCard';
import { getAllStudentAttendances } from 'features/attandence-management/student-attandences/redux/studentAttendanceThunks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const Students = () => {
  // States
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    dispatch(getAllStudentAttendances({ branch_id: selectedBranchId }));
  }, [selectedBranchId, dispatch, refetch]);

  useTimeout(() => {
    setLoading(false);
  }, 1000);

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
            <Grid item spacing={2} className="match-height" sx={{ marginTop: 3 }}>
              <StudentAttendanceCard />
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

export default Students;
