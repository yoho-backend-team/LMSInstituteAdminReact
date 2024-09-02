import { Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import Icon from 'components/icon';
import { getAllBranches } from 'features/branch-management/redux/branchThunks';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSpinner } from 'context/spinnerContext';
import { setBranches } from 'features/branch-management/redux/branchSlice';
import toast from 'react-hot-toast';

const TableHeader = (props) => {
  const { branches, setRefetchBranch, refetchBranch } = props;
  const [searchValue, setSearchValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const { show, hide } = useSpinner();

  const handleSearch = async () => {
    show();
    const data = branches?.data?.filter((branch) => branch?.branch_identity?.toLowerCase().includes(searchValue?.toLowerCase()));
    if (data && data?.length !== 0) {
      dispatch(setBranches({ last_page: "1", data: data, count: data?.length }));
      setIsSearch(true);
      hide();
    } else {
      dispatch(getAllBranches({ perPage: "1000", branch_identity: searchValue }));
      setIsSearch(true);
      hide();
    }
  };

  return (
    <Box
      sx={{
        pb: 2,
        pt: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "white",  
        boxShadow : "0 .25rem .875rem 0 rgba(38,43,67,.16)",
        borderRadius: '8px',
        px: 2, 
      }}
    >
      <TextField
        value={searchValue}
        sx={{
          width: 400,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
        placeholder="Search Branch"
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isSearch ? (
                <IconButton onClick={() => { setRefetchBranch(!refetchBranch); setIsSearch(false); setSearchValue(""); }}>
                  <Icon icon="material-symbols:close" />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleSearch()}>
                  <Icon icon="material-symbols:search" />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
      />
      <Box
        component={Link}
        to="branches/add"
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          textDecoration: 'none', 
          mt: { xs: 3, sm: 0 } 
        }}
      >
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Icon icon="tabler:plus" />}
          sx={{
            borderRadius: '8px',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
          }}
        >
          Add New Branch
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
