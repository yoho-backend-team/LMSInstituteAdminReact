// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
// ** Custom Component Import
import { TextField } from '@mui/material';
import { useState } from 'react';
import CategoryAddModal from './CategoryAddModal';

const CategoryCardHeader = (props) => {
  // ** Props
  const { value, handleFilter, setCategoryRefetch } = props;
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleAddClose = () => {
    setAddModalOpen(false);
  };

  const handleAdd = (itemId) => {
    console.log('Add clicked for item ID:', itemId);
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
          value={value}
          sx={{
            width: 400
          }}
          placeholder="Search Category"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add New Category
          </Button>
        </Box>
      </Box>
      <CategoryAddModal open={isAddModalOpen} handleAddClose={handleAddClose} setCategoryRefetch={setCategoryRefetch} />
    </>
  );
};

export default CategoryCardHeader;
