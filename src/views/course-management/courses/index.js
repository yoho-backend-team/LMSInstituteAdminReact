// material-ui
import { Grid } from '@mui/material';

// project imports
import CourseCard from 'features/course-management/courses/components/CourseCard';
import CourseCardHeader from 'features/course-management/courses/components/CourseCardHeader';
import CourseFilter from 'features/course-management/courses/components/CourseFilterCard';
const Courses = () => (
  <Grid>
       <Grid item xs={12} sm={12}>
      <CourseFilter />
      <CourseCardHeader />
    </Grid>
  <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
    <CourseCard
      title="React FrontEnd"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
      rating="4 star"
      reviews="98 reviews"
      ratingnumb="4"
      image="https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D"
    />
        <CourseCard
      title="Angular FrontEnd"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
      rating="4 star"
      reviews="98 reviews"
      ratingnumb="4"
      image="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYWNoaW5nfGVufDB8fDB8fHww"
    />
        <CourseCard
      title="Java Backend"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
      rating="3 star"
      reviews="98 reviews"
      ratingnumb="3"
      image="https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D"
    />
        <CourseCard
      title="React FrontEnd"
      description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy"
      rating="2 star"
      reviews="98 reviews"
      ratingnumb="2"
      image="https://plus.unsplash.com/premium_photo-1677966720018-580c48b67bd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlYWNoaW5nfGVufDB8fDB8fHww"
    />
  </Grid>
  </Grid>

);

export default Courses;
