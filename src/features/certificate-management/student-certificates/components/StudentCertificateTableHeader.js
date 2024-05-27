import { Grid, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import MenuItem from '@mui/material/MenuItem';
import Icon from 'components/icon';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllStudentCertificates } from '../redux/studentCertificateThunks';
import { useInstitute } from 'utils/get-institute-details';

const StudentCertificateTableHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };

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
    const data = { is_active: e.target.value, branchid: selectedBranchId ,InstituteId: useInstitute().getInstituteId(), page: '1'};
    dispatch(getAllStudentCertificates(data));
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Student Certificates" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end', display: 'flex' }}>
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
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      fullWidth
                      options={batches}
                      filterSelectedOptions
                      onChange={(e, newValue) => {
                        const selectedBatchId = newValue?._id || '';
                        const data = {
                          batch_id: selectedBatchId,
                          branchid: selectedBranchId ,InstituteId: useInstitute().getInstituteId(), page: '1'
                        };
                        dispatch(getAllStudentCertificates(data));
                      }}
                      id="autocomplete-multiple-outlined"
                      getOptionLabel={(option) => option.batch_name || ''}
                      renderInput={(params) => <TextField {...params} label="Batches" placeholder="Favorites" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      multiple
                      fullWidth
                      options={courses}
                      filterSelectedOptions
                      onChange={(e, newValue) => {
                        const courseId = newValue.map((item) => item._id);
                        const data = {
                          course_id: courseId,
                          branch_id: selectedBranchId,
                          branchid: selectedBranchId ,InstituteId: useInstitute().getInstituteId(), page: '1'
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
                    <Button onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
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
