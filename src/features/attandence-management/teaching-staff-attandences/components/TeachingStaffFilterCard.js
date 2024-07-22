import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllTeachingStaffs } from 'features/staff-management/teaching-staffs/redux/teachingStaffThunks';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { useInstitute } from 'utils/get-institute-details';
import { getAllTeachingStaffAttendances } from '../redux/teachingStaffAttendanceThunks';

const TeachingStaffFilterCard = (props) => {
  const { selectedBranchId } = props;

  const dispatch = useDispatch();

  const [statusValue, setStatusValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
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
    const data = { is_active: e.target.value, branch: selectedBranchId,institute:useInstitute().getInstituteId(), type: 'teaching' };
    dispatch(getAllTeachingStaffAttendances(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      e.preventDefault()
      // dispatch(getAllTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'teaching' }));
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
                        type: 'teaching_staff'
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
