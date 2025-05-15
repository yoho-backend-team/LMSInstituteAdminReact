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
import { getAllCourseNotes } from '../redux/noteThunks';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
const NotesHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    const data = {
      branch: selectedBranchId
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
      branch: selectedBranchId
    };
    dispatch(getAllCourseNotes(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    const value = e.target.value;
    setStatusValue(value);

    let data = { branch: selectedBranchId };
    if (value !== '') {
      data = { ...data, is_active: value };
    }
    dispatch(getAllCourseNotes(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      e.preventDefault();
      // dispatch(getAllCourseNotes({ search: searchInput, branch: selectedBranchId }));
      setSearchValue(searchInput);
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

              <Typography variant="h2">Notes</Typography>
            </Box>
            <Box>
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
                Add Notes
              </Button>
            </Box>
          </Box>
          {showInputs && (
            <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' , boxShadow:3,mt:1}}>
              <Grid item xs={12} sm={4} >
                <TextField
                  select
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '50px' // Rounded input container
                    },
                    '& fieldset': {
                      borderRadius: 50 // Rounded fieldset for consistent appearance
                    }
                  }}
                  label="Status"
                  SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value="">Select Status</MenuItem>
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
                      branch: selectedBranchId
                    };

                    dispatch(getAllCourseNotes(data));
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

NotesHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default NotesHeader;
