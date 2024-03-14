// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
// ** Icon Imports
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Icon from 'components/icon';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentCertificates } from '../redux/studentCertificateThunks';
import { useState, useCallback } from 'react';

const StudentCertificateTableHeader = (props) => {
  // ** Props
  const { toggle, selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
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

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentCertificates({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

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
                    <Autocomplete
                      // multiple
                      fullWidth
                      options={batch}
                      filterSelectedOptions
                      onChange={(e, newValue) => {
                        // const batchId = newValue.map((item) => item.batch.batch_id);
                        console.log(newValue);
                        const data = {
                          batch_id: newValue.batch.batch_id,
                          branch_id: selectedBranchId
                        };
                        dispatch(getAllStudentCertificates(data));
                      }}
                      // defaultValue={[top100Films[13]]}
                      id="autocomplete-multiple-outlined"
                      getOptionLabel={(option) => option.batch.batch_name || ''}
                      renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                      // defaultValue={[top100Films[13]]}
                      id="autocomplete-multiple-outlined"
                      getOptionLabel={(option) => option.course_name || ''}
                      renderInput={(params) => <TextField {...params} label=" Courses" placeholder="Favorites" />}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    {/* <TextField
                      fullWidth
                      value={value}
                      label="Search Certificate"
                      sx={{}}
                      placeholder="Search"
                      onChange={(e) => handleFilter(e.target.value)}
                    /> */}

                    <TextField value={searchValue} fullWidth placeholder="Search Certificate" onChange={(e) => handleSearch(e)} />
                  </Grid>

                  <Grid item sm={6} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
                    <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
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

export default StudentCertificateTableHeader;
