import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourseCategories } from '../../redux/courseCategoryThunks';

const CategoryFilter = ({ selectedBranchId }) => {
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value };
    dispatch(getAllCourseCategories(data));
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Course Categories" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>

  
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
                        dispatch(getAllCourseCategories(data));
                      }}
                      options={courses}
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                    />
                  </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export default CategoryFilter;
