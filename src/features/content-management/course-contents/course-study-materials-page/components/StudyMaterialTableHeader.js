// ** MUI Imports
import { useCallback ,useState} from 'react';
import { Grid, TextField } from '@mui/material';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


// ** Icon Imports
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Icon from 'components/icon';
// import { getAllCourseCategories } from 'features/course-management/categories-page/redux/courseCategoryThunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourses } from 'features/course-management/courses-page/redux/courseSelectors';
import { getAllCourses } from 'features/course-management/courses-page/redux/courseThunks';
import { getAllCourseStudyMaterials } from '../redux/studyMaterialThunks';


const StudyMaterialHeader = (props) => {
  // ** Props
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    dispatch(getAllCourses(data));
  }, [dispatch, selectedBranchId]);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllCourseStudyMaterials(data));
  };

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllCourseStudyMaterials({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
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
                      <MenuItem value="1">Active</MenuItem>
                      <MenuItem value="0">Inactive</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      fullWidth
                      // value={value}
                      onChange={(e, newValue) => {
                        // const courseId = newValue?.map((item) => item?.course_id);
                        const data = {
                          course_id: newValue.course_id,
                          branch_id: selectedBranchId
                        };
                     
                        dispatch(getAllCourseStudyMaterials(data));
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

export default StudyMaterialHeader;
