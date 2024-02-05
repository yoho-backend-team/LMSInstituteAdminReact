// material-ui
import { Grid } from '@mui/material';

// project imports
import CourseCard from 'features/course-management/courses/components/CourseCard';
import CourseCardHeader from 'features/course-management/courses/components/CourseCardHeader';
import CourseFilter from 'features/course-management/courses/components/CourseFilterCard';

const courseData = [
  {
    price: '$200',
    chipText: 'Active',
    chipColor: 'success',
    personName: 'Leonardo DiCaprio',
    students: '80+ Modules',
    coursename: 'React Js Masterclass',
    image:
      'https://plus.unsplash.com/premium_photo-1663126346116-f0ccaf232268?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D'
  },
  {
    price: '$150',
    chipText: 'Active',
    chipColor: 'success',
    coursename: 'Angular FrontEnd',
    personName: 'Johnny Depp',
    students: '180+ Modules',
    image:
      'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYWNoaW5nfGVufDB8fDB8fHww'
  },
  {
    price: '$220',
    chipText: 'Active',
    chipColor: 'success',
    coursename: 'Java Backend',
    personName: 'Tom Cruise',
    students: '50+ Modules',
    image:
      'https://images.unsplash.com/photo-1605711285791-0219e80e43a3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhY2hpbmd8ZW58MHx8MHx8fDA%3D'
  },
  {
    price: '$300',
    chipText: 'Active',
    chipColor: 'success',
    coursename: 'React Native Materclass',
    personName: 'Brad Pitt',
    students: '100+ Modules',
    image:
      'https://plus.unsplash.com/premium_photo-1677966720018-580c48b67bd0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlYWNoaW5nfGVufDB8fDB8fHww'
  }
];

const Courses = () => (
  <Grid>
    <Grid item xs={12} sm={12}>
      <CourseFilter />
      <CourseCardHeader />
    </Grid>
    <Grid container spacing={2} className="match-height" sx={{ marginTop: 0 }}>
      {courseData.map((course, index) => (
        <CourseCard
          key={index}
          price={course.price}
          chipText={course.chipText}
          chipColor={course.chipColor}
          personName={course.personName}
          students={course.students}
          coursename={course.coursename}
          image={course.image}
        />
      ))}
    </Grid>
  </Grid>
);

export default Courses;
