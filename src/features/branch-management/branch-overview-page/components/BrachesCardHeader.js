import { Link } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import Icon from 'components/icon';
import { useState, useCallback } from 'react';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import { useDispatch } from 'react-redux';

const TableHeader = () => {
  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllBranches({ search: searchInput }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
    },
    [dispatch]
  );

  return (
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
      {/* Search input */}
      <TextField
        value={searchValue}
        sx={{
          width: 400
        }}
        placeholder="Search Branch"
        onChange={handleSearch}
      />
      {/* Add new branch button */}
      <Box
        component={Link}
        to="branches/add"
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', textDecoration: 'none', mt: { xs: 3, sm: 0 } }}
      >
        <Button variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
          Add New Branch
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
