import { TextField, Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllCourseCategories } from '../../redux/courseCategoryThunks';

const CategoryFilter = ({ selectedBranchId }) => {
  const [statusValue, setStatusValue] = useState('');
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId,
    };
    getCourses(data);
  }, [selectedBranchId]);

  const getCourses = async (data) => {
    const result = await getAllCourses(data);
    if (result?.data) {
      setCourses(result?.data);
    }
  };

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { is_active: e.target.value };
    dispatch(getAllCourseCategories(data));
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={4}>
        <Grid item xs={12} >
        <Card sx={{ boxShadow: 'none', border: 'none' }}>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 'bold', color: 'primary.main' }}
                >
                  Filter Course Categories
                </Typography>
              }
            />
            <CardContent sx={{ pt: 0,backgroundColor:"white" }}>
              <Grid container spacing={3}>
                {/* Status Filter */}
                <Grid item xs={12} sm={4}>
                  <TextField
                    select
                    fullWidth
                    label="Filter by Status"
                    value={statusValue}
                    onChange={handleFilterByStatus}
                    sx={{
                       
                        backgroundColor: 'white',
                      
                    }}
                  >
                    <MenuItem value={null}>All Statuses</MenuItem>
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </TextField>
                </Grid>

                {/* Course Filter */}
                <Grid item xs={3} sm={4}>
                  <Autocomplete
                    fullWidth
                    options={Array.isArray(courses) ? courses : []}
                    getOptionLabel={(option) => option?.course_name || ''}
                    onChange={(e, newValue) => {
                      const data = {
                        course_id: newValue?.course_id,
                        branch_id: selectedBranchId,
                      };
                      dispatch(getAllCourseCategories(data));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Filter by Course"
                        sx={{
                          
                            backgroundColor: 'white',
                          
                        }}
                      />
                    )}
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

CategoryFilter.propTypes = {
  selectedBranchId: PropTypes.any,
};

export default CategoryFilter;

