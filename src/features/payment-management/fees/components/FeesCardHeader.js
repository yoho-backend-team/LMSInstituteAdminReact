// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
// ** Custom Component Import
import { TextField } from '@mui/material';
import { getAllStudentFees } from '../redux/studentFeeThunks';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

const FeesCardHeader = (props) => {
  const {toggle,selectedBranchId } = props;

    // State for search value
    const [searchValue, setSearchValue] = useState('');

    // Dispatch function
    const dispatch = useDispatch();
  
    // Callback function to handle search
    const handleSearch = useCallback(
      (e) => {
        const searchInput = e.target.value;
        dispatch(getAllStudentFees({ search: searchInput ,branch_id:selectedBranchId }));
        setSearchValue(searchInput);
        // Dispatch action to fetch branches with search input
      },
      [dispatch]
    );

  return (
    <>
      <Box
        sx={{
          px: 1,
          pb: 1,
          pt: 1,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2
        }}
      >
        <TextField
          value={searchValue}
          sx={{
            width: 400
          }}
          placeholder="Search Fee"
          onChange={(e) => handleSearch(e)}
        />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={toggle} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Fee
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FeesCardHeader;
