import { Grid, TextField, Box, Typography } from '@mui/material';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
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
  const [showInputs, setShowInputs] = useState(false);
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
    const data = { is_active: e.target.value, branch_id: selectedBranchId, institute_id: useInstitute().getInstituteId() };
    dispatch(getAllCourseModules(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      e.prventDefault();
      dispatch(getAllCourseModules({ search: searchInput, branch_id: selectedBranchId }));
    },
    [dispatch]
  );
  const toggleInputs = () => {
    setShowInputs((prev) => !prev);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 6, py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
                onClick={toggleInputs}
                sx={{
                  py: 1,
                  px: 2,
                  borderRadius: '50px',
                  mr: 2,
                  backgroundColor: '#f3f4f6',
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                
                <FilterAltTwoToneIcon />
              </Button>

            <Typography variant="h2">Modules</Typography>
            </Box>
              <Button
                onClick={toggle}
                variant="contained"
                sx={{
                  '& svg': { mr: 1 },
                  px: 2,
                  py: 1.7,
                  borderRadius: '50px',
                  backgroundColor: '#0CCE7F',
                  ':hover': { backgroundColor: '#0AA865' },
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                <Icon fontSize="1.125rem" icon="tabler:plus" />
                Add Modules
              </Button>
          </Box>
          {showInputs && (
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' ,boxShadow:3,mt:0.2}}>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px' // Rounded input container
                    },
                    '& fieldset': {
                      borderRadius: 50 // Rounded fieldset for consistent appearance
                    }
                  }}
                  SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value={null}>Select Status</MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Autocomplete
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px' // Rounded input container
                    },
                    '& fieldset': {
                      borderRadius: 50 // Rounded fieldset for consistent appearance
                    }
                  }}
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
            </Grid>
          )}
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
