import { TextField ,IconButton,InputAdornment} from '@mui/material';
import Box from '@mui/material/Box';

import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getAllCourses } from '../../redux/courseThunks';
import { useSpinner } from 'context/spinnerContext';
import { setCourses } from '../../redux/courseSlice';

const CourseCardHeader = ({ selectedBranchId,courses,setCourseRefetch }) => {
  // State for search value
  const [searchValue, setSearchValue] = useState('');
  const [isSearch,setIsSearch] = useState(false)
  const {show,hide} = useSpinner()

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = () => {
      show()
      const data = courses?.data?.filter((course)=>course?.course_name.toLowerCase().includes(searchValue?.toLowerCase()))
      if(data&&data?.length!==0){
        setIsSearch(true)
        dispatch(setCourses({last_page:1,data:data}))
        hide()
      }else{
        setIsSearch(true)
        dispatch(getAllCourses({ course_name: searchValue, id: selectedBranchId }))
        hide()
      }
  }

  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          marginLeft:"10px",
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor:"white",
          
        }}
      >
        <TextField
          value={searchValue}
          sx={{
            width: 330,
            mt:1
          }}
          placeholder="Search Courses"
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            endAdornment:(
              <InputAdornment position='end' >
              {
                isSearch ?
                <IconButton onClick={()=>{setIsSearch(false);setCourseRefetch((prev)=>!prev);setSearchValue('')}}>
                  <Icon icon={"material-symbols:close"} />
                </IconButton>
                :
                <IconButton onClick={()=>handleSearch()} >
                  <Icon icon={"material-symbols:search"} />
                </IconButton>
              }
              </InputAdornment>
            )
          }}
        />
       
      </Box>
    </>
  );
};

CourseCardHeader.propTypes = {
  selectedBranchId: PropTypes.any
};

export default CourseCardHeader;
