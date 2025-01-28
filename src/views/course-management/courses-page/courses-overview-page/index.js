import { Grid, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import FilterListIcon from '@mui/icons-material/FilterList';
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
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    const data = {
      id: selectedBranchId,
      page: '1',
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId, courseRefetch]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Filter Toggle Button */}
      <Grid container>
        <Grid item xs={12} sx={{ mb: 2, zIndex: 11, position: 'relative' }}>
          <Button 
          
            variant="contained"
            color="primary"
            onClick={() => setIsFilterVisible((prev) => !prev)}
            startIcon={<FilterListIcon />}
          >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </Grid>
      </Grid>

      {/* Overlay for CourseFilter and CourseCardHeader */}
      {isFilterVisible && (
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            zIndex: 10,
            padding: '16px',
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
          }}
        >
          <CourseFilter selectedBranchId={selectedBranchId} />
          <CourseCardHeader
            setCourseRefetch={setCourseRefetch}
            selectedBranchId={selectedBranchId}
            courses={courses}
          />
        </div>
      )}

      {/* Cards Section */}
      {courseLoading ? (
        <CourseSkeleton />
      ) : (
        <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
          {courses?.data?.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
              setCourseRefetch={setCourseRefetch}
              sx={{
                boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
              }}
            />
          ))}
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
                page: page,
              };
              dispatch(getAllCourses(data));
            }}
          />
        </Grid>
      )}
    </div>
  );
};

export default Courses;

