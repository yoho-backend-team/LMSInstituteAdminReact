import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import { getAllCourseCategories } from 'features/course-management/categories-page/services/courseCategoryServices';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { getAllCourses } from '../../redux/courseThunks';

const CourseFilter = ({ selectedBranchId }) => {
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();

  const [activeCategories, setActiveCategories] = useState([]);
  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const result = await getAllCourseCategories();
    if (result.data) {
      setActiveCategories(result?.data);
    }
  };

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllCourses(data));
  };

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
            <CardHeader title="Institute Courses" />
            <CardContent sx={{ pt: 0 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Search By Status"
                    defaultValue={''}
                    SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    multiple
                    fullWidth
                    options={activeCategories}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      const categoryId = newValue.map((item) => item.category_id);
                      const data = {
                        category_id: categoryId,
                        branch_id: selectedBranchId
                      };
                      dispatch(getAllCourses(data));
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.category_name || ''}
                    renderInput={(params) => <TextField {...params} label="Search By Categories" placeholder="Favorites" />}
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

CourseFilter.propTypes = {
  selectedBranchId: PropTypes.any
};
export default CourseFilter;
