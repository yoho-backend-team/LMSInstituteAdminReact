import { TextField, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';

import Icon from 'components/icon';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourseCategories } from '../../redux/courseCategoryThunks';


const CategoryCardHeader = (props) => {
  // ** Props
  const { setCategoryRefetch } = props;
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
    },
    []
  );

  // Function to trigger search on icon click
  const triggerSearch = useCallback(() => {
    dispatch(getAllCourseCategories({ search: searchValue }));
  }, [dispatch, searchValue]);

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  return (
    <>
      <Box>
      <TextField
  value={searchValue}
  onChange={handleSearch}
  placeholder="Search Category"
  variant="outlined"
  size="small"
  sx={{
    marginLeft: "10px",
    marginTop: "26px",
    width: 350,
    
    backgroundColor: '#ffffff',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      height: '55px', 
      padding: '0 14px', 
      borderRadius:"10px",
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#bdbdbd',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0CCE7F',
      },
    },
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <Icon
          icon="tabler:search"
          color="action"
          onClick={triggerSearch}
          sx={{ cursor: 'pointer' }}
        />
      </InputAdornment>
    ),
  }}
/>

   
      </Box>
      
    </>
  );
};



export default CategoryCardHeader;
