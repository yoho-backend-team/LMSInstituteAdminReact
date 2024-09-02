import { Box, Button } from '@mui/material';
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
import { useDispatch, } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInstitute } from 'utils/get-institute-details';

const TeacherFilter = (props) => {
  const { selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);
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
    const data = { is_active: e.target.value, branchid: selectedBranchId, instituteId: useInstitute().getInstituteId()  };
    dispatch(getAllTeachingStaffs(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      dispatch(getAllTeachingStaffs({ search: searchInput, branch_id: selectedBranchId, type: 'teaching' }));
    },
    [dispatch]
  );
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title="Teaching Staff" />
          <CardContent>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Grid item xs={12} sm={6}>
              <Autocomplete
              fullWidth
              onChange={(e, newValue) => {
                const courseId = newValue ? newValue._id : ''; 
                const data = {
                  course: courseId,
                  branchid: selectedBranchId,
                  instituteId: useInstitute().getInstituteId() 
                };
                dispatch(getAllTeachingStaffs(data));
              }}
              options={courses}
              getOptionLabel={(option) => option.course_name || ''}
              renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Search By Course" />}
              key={(option, index) => index}
            />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Search By Status"
                  SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value={null}>Select Status</MenuItem>
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
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

              <Grid item xs={12} sm={3} sx={{ alignItems: 'center' }}>
                <Box component={Link} to={'teaching-staffs/add'} sx={{ p: 0, m: 0 }}>
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.5, borderRadius: '0.5rem', backgroundColor: "#0CCE7F", ":hover": { backgroundColor : "#0AA865" } }}>
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

TeacherFilter.propTypes = {
  selectedBranchId: PropTypes.any
};

export default TeacherFilter;
