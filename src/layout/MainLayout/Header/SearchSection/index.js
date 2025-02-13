import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  TextField,
  Popper,
  MenuItem,
  IconButton,
} from '@mui/material';

import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedBranch } from 'features/authentication/authActions';

// Styles
const PopperStyle = styled(Popper)(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px',
  },
}));

const OutlineInputStyle = styled(TextField)(({ theme }) => ({
  minWidth: 250,
  marginLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important',
  },
  [theme.breakpoints.down('lg')]: {
    width: 250,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff',
  },
}));

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('Keelkattalai');
 
  const branches = useSelector((state) => state.auth.branches);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '70%' }}>
        <IconButton onClick={toggleSearch} sx={{ ml: 'auto' }}>
          
        </IconButton>
      </Box>

     
        <Box sx={{ display: { xs: 'block', md: 'block' } }}>
          <OutlineInputStyle
            id="input-search-header"
            value={selectedBranchId?.trim()}
            onChange={(e) => {
              dispatch(updateSelectedBranch(e.target.value));
              localStorage.setItem('selectedBranchId', e.target.value);
            }}
            placeholder="Search"
            aria-describedby="search-helper-text"
            inputProps={{ 'aria-label': 'weight' }}
            select
            label="Branch"
           
          >
            {branches?.map((branch, index) => (
              <MenuItem
                value={branch?.uuid}
                key={index}
                selected={selectedBranchId === branch?.uuid}
              >
                {branch?.branch_identity}
              </MenuItem>
            ))}
          </OutlineInputStyle>
        </Box>
      
    </>
  );
};

SearchSection.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState,
};

export default SearchSection;
