import { Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourseModules } from '../redux/moduleThunks';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { useInstitute } from 'utils/get-institute-details';

const ModuleHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  
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

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourseModules(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { is_active: e.target.value, branch_id: selectedBranchId,institute_id : useInstitute().getInstituteId() };
    dispatch(getAllCourseModules(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      e.prventDefault()
      dispatch(getAllCourseModules({ search: searchInput, branch_id: selectedBranchId }));
    },
    [dispatch]
  );
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title="Modules" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12}>
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                    >
                      <MenuItem value={null}>Select Status</MenuItem>
                      <MenuItem value="true">Active</MenuItem>
                      <MenuItem value="false">Inactive</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      fullWidth
                      onChange={(e, newValue) => {
                        const data = {
                          course: newValue._id,
                          branch_id: selectedBranchId
                        };

                        dispatch(getAllCourseModules(data));
                      }}
                      options={courses}
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                    />
                  </Grid>
                  {/* <Grid item sm={3} xs={12}>
                    <TextField value={searchValue} fullWidth placeholder="Search Course" onChange={(e) => handleSearch(e)} />
                  </Grid> */}

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 }, backgroundColor : "#0CCE7F", ":hover" : { backgroundColor: "#0AA865" } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Modules
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

ModuleHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default ModuleHeader;
