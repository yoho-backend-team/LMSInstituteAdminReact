import { Grid, TextField, Typography, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourseStudyMaterials } from '../redux/studyMaterialThunks';

const StudyMaterialHeader = (props) => {
  // ** Props
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
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
    const data = { is_active: e.target.value, branch: selectedBranchId };
    dispatch(getAllCourseStudyMaterials(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      e.preventDefault();
      dispatch(getAllCourseStudyMaterials({ search: searchInput, branch_id: selectedBranchId }));
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 6,py:2 }}>
          <Box sx={{display:"flex",alignItems:"center"}} >

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

            <Typography variant="h2">Study materials</Typography>
          </Box>
            <Box>
              <Button
                onClick={toggle}
                variant="contained"
                sx={{
                  '& svg': { mr: 2 },
                  px: 2,
                  py:1.7,
                  borderRadius: '50px',
                  backgroundColor: '#0CCE7F',
                  ':hover': { backgroundColor: '#0AA865' },
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}
              >
                <Icon fontSize="1.125rem" icon="tabler:plus" />
                Add Study Material
              </Button>
            </Box>
          </Box>
          {showInputs && (
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' ,boxShadow:3,mt:1 }}>
              <Grid item xs={12}>
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '50px' // Rounded input container
                        },
                        '& fieldset': {
                          borderRadius: 50 // Rounded fieldset for consistent appearance
                        }
                      }}
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
                      // value={value}
                      onChange={(e, newValue) => {
                        const data = {
                          course: newValue._id,
                          branch: selectedBranchId
                        };
                        dispatch(getAllCourseStudyMaterials(data));
                      }}
                      // options={Array.isArray(courses) ? courses : []} // Ensure options is an array
                      options={courses}
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Course" />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Card>
      </Grid>
    </Grid>
  );
};

StudyMaterialHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default StudyMaterialHeader;
