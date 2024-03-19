import { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
// import { getAllStudents } from '../services/studentService';
import { getAllStudents } from '../redux/studentThunks';
import { getAllStudentsByBatch } from '../services/studentService';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
// import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
const StudentFilter = (props) => {
  const { value, handleFilter,selectedBranchId } = props;

  const [statusValue, setStatusValue] = useState('');
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch(); 
  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
  };

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);



  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Students" />
          <CardContent>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  // value={value}
                  onChange={(e, newValue) => {
                    // const courseId = newValue?.map((item) => item?.course_id);
                    const data = {
                    
                      course_id: newValue.course_id,
                      branch_id: selectedBranchId
                    };
                    dispatch(getAllStudents(data));
                  }}
                  options={courses}
                  getOptionLabel={(option) => option.course_name || ''}
                  renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  value={value}
                  onChange={(e, newValue) => {
                    // const courseId = newValue?.map((item) => item?.course_id);
                    const data = {
                      course_id: newValue.course_id,
                      branch_id: selectedBranchId
                    };
                    dispatch(getAllStudentsByBatch(data));
                  }}
                  options={courses}
                  getOptionLabel={(option) => option.course_name || ''}
                  renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Batches" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                  <MenuItem value="0">Active</MenuItem>
                  <MenuItem value="1">Deactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField
                  fullWidth
                  value={value}
                  label="Search Staff"
                  sx={{}}
                  placeholder="Search Staff "
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                <Box component={Link} to={'add'}>
                  <Button variant="contained" size="medium" fullWidth>
                    Add New Student
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentFilter;
