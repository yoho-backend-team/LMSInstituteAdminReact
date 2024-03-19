import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import CourseSkeleton from 'components/cards/Skeleton/CourseSkeleton';
import CourseCard from 'features/course-management/courses-page/course-overview-page/components/CourseCard';
import CourseCardHeader from 'features/course-management/courses-page/course-overview-page/components/CourseCardHeader';
import CourseFilter from 'features/course-management/courses-page/course-overview-page/components/CourseFilterCard';
import { selectCourses, selectLoading } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const courseLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [courseRefetch, setCourseRefetch] = useState(false);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId, courseRefetch]);

  return (
    <>
      <Grid container spacing={1} className="match-height">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <CourseFilter selectedBranchId={selectedBranchId} />
            <CourseCardHeader setCourseRefetch={setCourseRefetch} selectedBranchId={selectedBranchId} />
          </Grid>
          {courseLoading ? (
            <CourseSkeleton />
          ) : (
            courses?.map((course, index) => (
              // Using useMemo to memoize the BranchCard component to prevent unnecessary re-renders
              <CourseCard key={index} course={course} setCourseRefetch={setCourseRefetch} />
            ))
          )}
        </Grid>
        <Grid item xs={12} sm={12} sx={{ mt: 2.75, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination count={10} color="primary" />
        </Grid>
      </Grid>
    </>
  );
};

export default Courses;
