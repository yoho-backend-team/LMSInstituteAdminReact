import { useEffect,useCallback } from 'react';
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
import { getAllTeachingStaffs } from '../services/teachingStaffServices';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
// import { getAllCourseModules } from 'features/content-management/course-contents/course-modules-page/services/moduleServices';
const TeacherFilter = (props) => {
  // const [selectedCourses, setSelectedCourses] = useState([]);
  const { selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      type:'teaching',
      branch_id: selectedBranchId
    };
    dispatch(getAllTeachingStaffs(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllTeachingStaffs(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllTeachingStaffs({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Teaching Staff" />
          <CardContent>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                     
                        dispatch(getAllTeachingStaffs(data));
                      }}
                      options={courses}
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
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
                  value={searchValue}
                  label="Search Staff"
                  sx={{}}
                  placeholder="Search Staff "
                  onChange={(e) => handleSearch(e)}
                />
              </Grid>

              <Grid item xs={12} sm={3} sx={{ mt: 1 }}>
                <Box component={Link} to={'add'}>
                  <Button variant="contained" size="medium" fullWidth>
                    Add New Staff
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

export default TeacherFilter;
