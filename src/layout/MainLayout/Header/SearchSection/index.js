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
<<<<<<< HEAD
import { useDispatch } from 'react-redux';
// assets
import {
  IconSearch
} from '@tabler/icons';
import { shouldForwardProp } from '@mui/system';

import { useSelector } from 'react-redux';
import secureLocalStorage from 'react-secure-storage';
=======

>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4

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

<<<<<<< HEAD
const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.mediumAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

// ==============================|| SEARCH INPUT - MOBILE||============================== //

const MobileSearch = () => {
  return (
    <OutlineInputStyle
      id="input-search-header"
      select
      sx={{
          backgroundColor : "red"
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Branch"
      aria-describedby="search-helper-text"
      inputProps={{ 'aria-label': 'weight' }}
    />
  );
};

MobileSearch.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState
};

// ==============================|| SEARCH INPUT ||============================== //

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('Keelkattalai');
=======
const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('Keelkattalai');
 
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
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
<<<<<<< HEAD
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <OutlineInputStyle
          id="input-search-header"
          value={selectedBranchId?.trim()}
          onChange={(e) => {
            dispatch(updateSelectedBranch(e.target.value));
            secureLocalStorage.setItem('selectedBranchId', e.target.value);
          }}
          placeholder="Search"
          aria-describedby="search-helper-text"
          inputProps={{ 'aria-label': 'weight' }}
          select
          label="Branch"
        >
          {branches?.map((branch, index) => (
            <MenuItem value={branch?.uuid} key={index} selected={selectedBranchId === branch?.uuid}>
              {branch?.branch_identity}
            </MenuItem>
          ))}
        </OutlineInputStyle>
      </Box>
=======

     
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
      
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
    </>
  );
};

<<<<<<< HEAD
export default SearchSection;
=======
SearchSection.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  popupState: PopupState,
};

export default SearchSection;
>>>>>>> a8d8554387264e85ea792f13f7281cd5e0c92bd4
