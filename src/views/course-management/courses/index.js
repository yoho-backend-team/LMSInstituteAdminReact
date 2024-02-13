// material-ui
import { Grid } from '@mui/material';

// project imports
import CourseCard from 'features/course-management/courses/components/CourseCard';
import CourseCardHeader from 'features/course-management/courses/components/CourseCardHeader';
import CourseFilter from 'features/course-management/courses/components/CourseFilterCard';
// import { useState } from 'react';
import { useEffect } from 'react';
import CourseSkeleton from 'components/cards/Skeleton/CourseSkeleton';
import Pagination from '@mui/material/Pagination';

import { getAllCourses } from 'features/course-management/courses/redux/courseThunks';
import { selectCourses, selectLoading } from 'features/course-management/courses/redux/courseSelectors';

import { useDispatch, useSelector } from 'react-redux';

const Courses = () => {
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const courseLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  useEffect(() => {
    dispatch(getAllCourses(selectedBranchId));
  }, [dispatch, selectedBranchId]);

  return (
    <>
      {courseLoading ? (
        <CourseSkeleton />
      ) : (
        <Grid>
          <Grid item xs={12} sm={12}>
            <CourseFilter />
            <CourseCardHeader />
          </Grid>
          <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
              />
            ))}
          </Grid>
          <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination count={10} color="primary" />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Courses;
