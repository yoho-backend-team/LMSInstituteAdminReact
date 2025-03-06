import { Box, Button,Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useState,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectBatches } from 'features/batch-management/batches/redux/batchSelectors';
import { getAllBatches } from 'features/batch-management/batches/redux/batchThunks';
import { getAllCourses } from 'features/course-management/courses-page/services/courseServices';
import { getAllStudents } from '../redux/studentThunks';
import { useInstitute } from 'utils/get-institute-details';
import Sidebar from 'components/sidebar';
import FilterListIcon from '@mui/icons-material/FilterList';

const StudentFilter = (props ) => {
  const { selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');

  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const batch = useSelector(selectBatches);
  
  //toggle filter card
  const [isCardOpen, setIsCardOpen] = useState(false);
  const filterCardRef = useRef(null);
 
  
  // const handleFilterByStatus = (e) => {
  //   setStatusValue(e.target.value);
  //   const data = { is_active: e.target.value, branch_id: selectedBranchId };
  //   dispatch(getAllStudents(data));
  // };

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
    dispatch(
      getAllBatches({
        branch_id: selectedBranchId
      })
    );
  }, [dispatch, selectedBranchId]);
  
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudents({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  //toggle handler
  const handleToggleCard = (event) => {
    
    setIsCardOpen((prev) => !prev);
  };




  
  

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>

        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
          <Button
            variant="contained"
            size="medium"
              data-ignore-outside-click="true"
            sx={{ width: '130px', py: 1.6, borderRadius: 2, backgroundColor: "#0CCE7F", ":hover": { backgroundColor: "#0AA865" } }}
            onClick={handleToggleCard}
          >
          <FilterListIcon/> {isCardOpen ? 'Hide' : 'Show Filter'}
          </Button>
        
                <Box component={Link} to={'students/add'}>
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.6, borderRadius: 2, backgroundColor : "#0CCE7F", ":hover" : { backgroundColor: "#0AA865" } }}>
                    Add New Student
                  </Button>
                </Box>
        </Box>
             
      </Grid>
      {isCardOpen && (
        <>

         <Box
         ref={filterCardRef}  
         sx={{
           position: 'relative',  
           top: '19%',  
           left:"50%",
          
           transform: 'translateX(-50%)',
           zIndex: 999,  
           width: '100%',    
           backgroundColor: 'white',
           boxShadow: 3,
           borderRadius: 2,
           p: 3,
           mt: 3,
           overflowY: 'auto',  
           maxHeight: '80vh',
           transition: 'left 0.3s ease',
            
         }}
       >
      <Grid item xs={12}>

          <CardHeader title={ <Typography variant="h3"  sx={{fontSize: '1.5rem',fontWeight: 'bold'}}>
      Students
    </Typography>} />
          <CardContent>

            <Grid container spacing={3}>
              
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  onChange={(e, newValue) => {
                    const data = {
                      course: newValue._id,
                      branch_id: selectedBranchId,
                      institute : useInstitute().getInstituteId()
                    };
                    dispatch(getAllStudents(data));
                  }}
                  options={courses}
                  getOptionLabel={(option) => option.course_name || ''}
                  renderInput={(params) => <TextField sx={{ mb: 2 }} {...params} label="Filter By Course"
                   />}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  options={batch?.data}
                  filterSelectedOptions
                  onChange={(e, newValue) => {
                    const data = {
                      batch_id: newValue._id,
                      branch_id: selectedBranchId
                    };
                    dispatch(getAllStudents(data));
                  }}
                  id="autocomplete-multiple-outlined"
                  getOptionLabel={(option) => option.batch_name || ''}
                  renderInput={(params) => <TextField {...params} label="Filter By Batches" placeholder="Favorites" />}
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Filter By Status"
                  SelectProps={{ value: statusValue, onChange: (e) => handleFilterByStatus(e) }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </TextField>
              </Grid> */}

<Grid item xs={12} sm={6}>
  <Autocomplete
    fullWidth
    value={statusValue}
    onChange={(e, newValue) => {
      setStatusValue(newValue);
      const data = { is_active: newValue, branch_id: selectedBranchId };
      dispatch(getAllStudents(data));
    }}
    options={["", "true", "false"]}  
    getOptionLabel={(option) => {
      if (option === "true") return "Active";
      if (option === "false") return "Inactive";
      return "Select Status";
    }}
    renderInput={(params) => <TextField {...params} label="Filter By Status" />}
  />
</Grid>
              
              <Grid item sm={3} xs={12}>
                <TextField value={searchValue} placeholder="Search Student" onChange={(e) => handleSearch(e)} fullWidth />
              </Grid>

            
            </Grid>
          </CardContent>
         
      </Grid>
      </Box>
      </>
      )}
    </Grid>
  );
};

StudentFilter.propTypes = {
  selectedBranchId: PropTypes.any
};

export default StudentFilter;