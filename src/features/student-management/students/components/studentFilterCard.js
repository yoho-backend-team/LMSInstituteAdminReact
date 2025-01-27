import { Box, Button } from '@mui/material';
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
 
  
  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { is_active: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllStudents(data));
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
    event.stopPropagation(); // Prevent triggering the click outside handler
    setIsCardOpen((prev) => !prev);
  };

    // Prevent background scrolling when card is open
  useEffect(() => {
    if (isCardOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCardOpen]);


  // Close the filter card if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterCardRef.current && !filterCardRef.current.contains(event.target) &&  
       event.target.getAttribute('data-ignore-outside-click') !== 'true') {
        setIsCardOpen(false);
      }
    };

    // Add event listener for clicks outside the filter card
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        
        <Box sx={{ mb: 2 , position: 'relative', zIndex: 1000}}>
          <Button
            variant="contained"
            size="medium"
              data-ignore-outside-click="true"
            sx={{ width: '130px', py: 1.6, borderRadius: 2, backgroundColor: "#0CCE7F", ":hover": { backgroundColor: "#0AA865" } }}
            onClick={handleToggleCard}
          >
          <FilterListIcon/> {isCardOpen ? 'Hide' : 'Show Filter'}
          </Button>
        </Box>
      </Grid>
      {isCardOpen && (
        <>
         {/* Overlay for background blur */}
    <Box
    sx={{
      position:'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',  
      backdropFilter: 'blur(4px)', 
      zIndex: 998,  
    }}
  />
         <Box
         ref={filterCardRef}  
         sx={{
           position: 'fixed',  
           top: '19%',  
           left:"60%",
          //  left: isSidebarOpen ? 'calc(60% + 200px)' : '60%',
           transform: 'translateX(-50%)',
           zIndex: 999,  
           width: '80%',    
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

        <Card sx={{ boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)" }} >
          <CardHeader title="Students" />
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

              <Grid item xs={12} sm={6}>
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
              </Grid>
              
              <Grid item sm={3} xs={12}>
                <TextField value={searchValue} placeholder="Search Student" onChange={(e) => handleSearch(e)} fullWidth />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Box component={Link} to={'students/add'}>
                  <Button variant="contained" size="medium" fullWidth sx={{ py: 1.6, borderRadius: 2, backgroundColor : "#0CCE7F", ":hover" : { backgroundColor: "#0AA865" } }}>
                    Add New Student
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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