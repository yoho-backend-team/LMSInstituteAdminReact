import { Box, Button, TextField } from '@mui/material';
import Icon from 'components/icon';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const TableHeader = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllBranches({ search: searchInput }));
      setSearchValue(searchInput);
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
      <TextField
        value={searchValue}
        sx={{
          width: 400
        }}
        placeholder="Search Branch"
        onChange={handleSearch}
      />
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
