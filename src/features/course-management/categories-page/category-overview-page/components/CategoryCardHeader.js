import { TextField, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCourseCategories } from '../../redux/courseCategoryThunks';
import CategoryAddModal from './CategoryAddModal';

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
      <Box
        sx={{
          pb: 2,
          pt: 3,
          px: 2,
          width: '100%',
          display: 'flex',
          marginTop: "10px",
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
        }}
      >
        <TextField
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search Category"
          variant="outlined"
          size="small"
          sx={{
            marginLeft:"10px",
            width: 750,
            backgroundColor: '#ffffff',
            borderRadius: 1,
            '& .MuiOutlinedInput-root': {
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
        <Box sx={{ marginRight:"20px",display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button
            onClick={handleAdd}
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#0CCE7F",
              ":hover": { backgroundColor: "#0AA865" },
              ml: 2,
            }}
            startIcon={<Icon icon="tabler:plus" />}
          >
            Add New Category
          </Button>
        </Box>
      </Box>
      <CategoryAddModal open={isAddModalOpen} handleAddClose={handleAddClose} setCategoryRefetch={setCategoryRefetch} />
    </>
  );
};

CategoryCardHeader.propTypes = {
  setCategoryRefetch: PropTypes.any
};

export default CategoryCardHeader;
