import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';

const TeachingStaffFilterCard = (props) => {
  const { selectedBranchId } = props;

  const dispatch = useDispatch();

  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const courses = useSelector(selectCourses);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
      // type: "teaching"
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId, type: 'teaching' };
    dispatch(getAllTeachingStaffs(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'teaching' }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Teaching Staff Attendance" />
            <CardContent>
              <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12} sm={4}>
                  <TextField select fullWidth label="Status" SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}>
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Autocomplete
                    multiple
                    fullWidth
                    options={courses}
                    filterSelectedOptions
                    onChange={(e, newValue) => {
                      const courseId = newValue.map((item) => item.course_id);
                      const data = {
                        course_id: courseId,
                        branch_id: selectedBranchId,
                        type: 'teaching'
                      };
                      dispatch(getAllTeachingStaffs(data));
                    }}
                    id="autocomplete-multiple-outlined"
                    getOptionLabel={(option) => option.course_name || ''}
                    renderInput={(params) => <TextField {...params} label=" Courses" placeholder="Favorites" />}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField value={searchValue} fullWidth placeholder="Search Batch" onChange={(e) => handleSearch(e)} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

TeachingStaffFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default TeachingStaffFilterCard;
