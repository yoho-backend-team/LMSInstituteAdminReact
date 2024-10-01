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
      id: selectedBranchId,
      page: '1'
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId, courseRefetch]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <CourseFilter selectedBranchId={selectedBranchId} />
          <CourseCardHeader setCourseRefetch={setCourseRefetch} selectedBranchId={selectedBranchId} courses={courses} />
        </Grid>
        {courseLoading  ?  (
          <CourseSkeleton />
        ) : (
          <Grid item xs={12}>
            {/* Display courses */}
            <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
              {courses?.data?.map((course, index) => (
                <CourseCard key={index} course={course} setCourseRefetch={setCourseRefetch} sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} />
              ))}
            </Grid>
          </Grid>
        )}

        {/* Pagination */}
        {courses?.last_page !== 1 && !courseLoading && (
          <Grid item xs={12} sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Pagination
              count={courses?.last_page}
              color="primary"
              onChange={(e, page) => {
                const data = {
                  id: selectedBranchId,
                  page: page
                };
                dispatch(getAllCourses(data));
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Courses;
