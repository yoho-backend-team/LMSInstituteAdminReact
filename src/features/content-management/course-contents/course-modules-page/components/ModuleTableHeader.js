import { Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourseModules } from '../redux/moduleThunks';

const ModuleHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourseModules(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllCourseModules(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllCourseModules({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
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
                      <MenuItem value="">Select Status</MenuItem>
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      fullWidth
                      onChange={(e, newValue) => {
                        const data = {
                          course_id: newValue.course_id,
                          branch_id: selectedBranchId
                        };

                        dispatch(getAllCourseModules(data));
                      }}
                      options={courses}
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                    />
                  </Grid>
                  <Grid item sm={3} xs={12}>
                    <TextField value={searchValue} fullWidth placeholder="Search Course" onChange={(e) => handleSearch(e)} />
                  </Grid>

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
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
