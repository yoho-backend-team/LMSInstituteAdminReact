import { Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentCertificates } from '../redux/studentCertificateThunks';

const StudentCertificateTableHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses);
  const batch = useSelector(selectBatches);

  useEffect(() => {
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentCertificates({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudentCertificates(data));
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Student Certificates" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4}>
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
                      // multiple
                      fullWidth
                      options={batch}
                      filterSelectedOptions
                      onChange={(e, newValue) => {
                        console.log(newValue);
                        const data = {
                          batch_id: newValue.batch.batch_id,
                          branch_id: selectedBranchId
                        };
                        dispatch(getAllStudentCertificates(data));
                      }}
                      id="autocomplete-multiple-outlined"
                      getOptionLabel={(option) => option.batch.batch_name || ''}
                      renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                    />
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
                          branch_id: selectedBranchId
                        };
                        dispatch(getAllStudentCertificates(data));
                      }}
                      id="autocomplete-multiple-outlined"
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField {...params} label=" Courses" placeholder="Favorites" />}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <TextField value={searchValue} fullWidth placeholder="Search Certificate" onChange={(e) => handleSearch(e)} />
                  </Grid>

                  <Grid item sm={4} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button  onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
                      <Icon fontSize="1.125rem" icon="tabler:plus" />
                      Add Student Certificate
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

StudentCertificateTableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default StudentCertificateTableHeader;
