import { Grid } from '@mui/material';
import StudentAttendanceViewSkeleton from 'components/cards/Skeleton/StudentAttendanceViewSkeleton';
import StudentAttendanceTable from 'features/attandence-management/student-attandences/components/StudentAttendanceTable';
import StudentViewHeaderCard from 'features/attandence-management/student-attandences/components/StudentViewHeaderCard';
import { getClassDetails } from 'features/attandence-management/student-attandences/services/studentAttendanceServices';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

const useTimeout = (callback, delay) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId);
  }, [callback, delay]);
};

const ViewAttendance = () => {
  const [loading, setLoading] = useState(true);

  useTimeout(() => {
    setLoading(false);
  }, 1000);
  const dispatch = useDispatch();
  const location = useLocation();
  const ClassId = location.state.id;
  const [ClassData, setClassData] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const data = {
      class_id: ClassId
    };
    getClassData(data);
  }, [dispatch, ClassId, refetch]);

  const getClassData = async (data) => {
    try {
      const result = await getClassDetails(data);
      if (result.success) {
        console.log('Class:', result.data);
        setClassData(result.data);
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(ClassData);
  return (
    <>
      {loading ? (
        <StudentAttendanceViewSkeleton />
      ) : (
        <Grid container spacing={3} sx={{ p: 1 }}>
          <Grid item xs={12} sm={12}>
            <StudentViewHeaderCard ClassData={ClassData} />
          </Grid>

          <Grid item xs={12}>
            <StudentAttendanceTable ClassData={ClassData} setRefetch={setRefetch} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewAttendance;
