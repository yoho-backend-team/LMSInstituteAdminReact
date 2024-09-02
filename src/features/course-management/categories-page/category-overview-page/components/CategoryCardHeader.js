import { TextField } from '@mui/material';
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
      dispatch(getAllCourseCategories({ search: searchInput }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );
  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleAdd = (itemId) => {
    setAddModalOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TextField
          value={searchValue}
          sx={{
            width: 400
          }}
          placeholder="Search Category"
          onChange={(e) => handleSearch(e)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" sx={{ backgroundColor: "#0CCE7F", ":hover": { backgroundColor: "#0AA865"} }} startIcon={<Icon icon="tabler:plus" />}>
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
