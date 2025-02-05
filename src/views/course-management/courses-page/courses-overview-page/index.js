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
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import Icon from 'components/icon';

const Courses = () => {

  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const courseLoading = useSelector(selectLoading);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const [courseRefetch, setCourseRefetch] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  
  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  
 

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
  <Grid item xs={12} sx={{   position: 'relative',display:"flex" ,alignItems:"center",justifyContent:"space-between"}}>
    <Button 
      variant="contained"
      color="primary"
      onClick={toggleFilterVisibility}
      startIcon={<FilterListIcon />}
      sx={{ mt: 2 }}
    >
      {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
    </Button>

          <Button
            sx={{ py: 1, borderRadius: '0.5rem', 
              backgroundColor: '#0CCE7F',
              marginRight:"20px",  
              '&:hover': {
                backgroundColor: '#0AA865',
                
              },
             }}
            variant="contained"
            component={Link}
            to="courses/add"
            color="primary"
            startIcon={<Icon icon="tabler:plus" />}
          >
            Add New Course
          </Button>
      
  </Grid>
  {isFilterVisible && (
        <div
          style={{
            position: 'relative',
           width:'100%',
           top:10,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
           cursor:"pointer",
            padding: '16px',
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            '&:hover': {
              backgroundColor: '#0AA865',
              
            },
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
</Grid>

         

      
      <div
        style={{
          position: 'relative',
          
          transition: 'filter 0.3s ease-in-out',
        }}
      >
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

     
     
    </div>
  );
};

export default Courses;
