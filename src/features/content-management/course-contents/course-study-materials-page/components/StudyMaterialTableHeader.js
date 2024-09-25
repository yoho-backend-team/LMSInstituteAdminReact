import { Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
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
    const data = { is_active: e.target.value , branch: selectedBranchId };
    dispatch(getAllCourseStudyMaterials(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      e.preventDefault()
      dispatch(getAllCourseStudyMaterials({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title="Study materials" />
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
                  {/* <Grid item sm={3} xs={12}>
                    <TextField value={searchValue} fullWidth placeholder="Search Course" onChange={(e) => handleSearch(e)} />
                  </Grid> */}

                  <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 }, backgroundColor : "#0CCE7F", ":hover":{ backgroundColor: "#0AA865"} }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Study Material
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

StudyMaterialHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default StudyMaterialHeader;
