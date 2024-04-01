import { Box, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { getAllStudents } from '../services/studentService';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { getAllStudents } from '../redux/studentThunks';
// import { getAllActiveCourses } from 'features/course-management/courses-page/services/courseServices';
const StudentFilter = (props) => {
  const { selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');

  const [statusValue, setStatusValue] = useState('');
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();
  const batch = useSelector(selectBatches);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudents(data));
  };

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudents({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

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
                  // multiple
                  fullWidth
                  options={batch}
                  filterSelectedOptions
                  onChange={(e, newValue) => {
                    // const batchId = newValue.map((item) => item.batch.batch_id);
                    console.log(newValue);
                    const data = {
                      batch_id: newValue.batch.batch_id,
                      branch_id: selectedBranchId
                    };
                    dispatch(getAllStudents(data));
                  }}
                  // defaultValue={[top100Films[13]]}
                  id="autocomplete-multiple-outlined"
                  getOptionLabel={(option) => option.batch.batch_name || ''}
                  renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextField value={searchValue} placeholder="Search Student" onChange={(e) => handleSearch(e)} />
              </Grid>

              <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                <Box component={Link} to={'students/add'}>
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
