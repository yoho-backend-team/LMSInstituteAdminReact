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
import FilterDesignCard from './FilterDesignCard';
import { IconX } from '@tabler/icons';

const StudentCertificateTableHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const dispatch = useDispatch();

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = { branch_id: selectedBranchId };
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
    const data = { branch_id: selectedBranchId };
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
    [dispatch, selectedBranchId]
  );

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { is_active: e.target.value, branchid: selectedBranchId, InstituteId: useInstitute().getInstituteId(), page: '1' };
    dispatch(getAllStudentCertificates(data));
  };

  const handleBatchChange = (e, newValue) => {
    setSelectedBatch(newValue);
    const selectedBatchId = newValue?._id || '';
    const data = {
      batch_id: selectedBatchId,
      branch_id: selectedBranchId,
      InstituteId: useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllStudentCertificates(data));
  };

  const handleCoursesChange = (e, newValue) => {
    setSelectedCourses(newValue);
    const courseId = newValue.map((item) => item._id);
    const data = {
      course_id: courseId,
      branch_id: selectedBranchId,
      InstituteId: useInstitute().getInstituteId(),
      page: '1'
    };
    dispatch(getAllStudentCertificates(data));
  };

  const [shows, setShows] = useState(true);
  const handleClose = () => {
    setShows(!shows);
  };

  return shows ? (
    <FilterDesignCard go={handleClose} />
  ) : (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
          <Button
            style={{
              backgroundColor: 'black',
              height: 10,
              position: 'absolute',
              right: 40,
              marginTop: 20
            }}
            onClick={handleClose}
          >
            <IconX stroke={2} />
          </Button>
          <CardHeader title="Student Certificates" />
          <CardContent sx={{ pt: 0, pb: 0 }}>
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              <Grid item xs={12} sx={{ mb: 3 }}>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      select 
                      fullWidth 
                      label="Status" 
                      value={statusValue} 
                      onChange={handleFilterByStatus}
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
                      onChange={handleBatchChange}
                      id="autocomplete-batches"
                      getOptionLabel={(option) => option.batch_name || ''}
                      renderInput={(params) => <TextField {...params} label="Batches" placeholder="Select Batch" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      multiple
                      fullWidth
                      options={courses}
                      filterSelectedOptions
                      onChange={handleCoursesChange}
                      id="autocomplete-courses"
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          label="Courses" 
                          placeholder="Select Courses" 
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={searchValue}
                      fullWidth
                      placeholder="Search Certificate"
                      onChange={handleSearch}
                      disabled={!selectedBatch || selectedCourses.length === 0}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} sx={{ textAlign: 'flex-start', mt: 2 }}>
                    <Button 
                      onClick={toggle} 
                      variant="contained" 
                      sx={{ '& svg': { mr: 2 },py:1,backgroundColor:!selectedBatch && selectedCourses.length===0?"grey":""}}
                      // disabled={!selectedBatch || selectedCourses.length === 0}
                    >
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
  toggle: PropTypes.func.isRequired,
  selectedBranchId: PropTypes.string.isRequired
};

export default StudentCertificateTableHeader;
