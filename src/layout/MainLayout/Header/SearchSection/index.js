import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  Grid,
  //  InputAdornment,
  TextField,
  Popper,
  MenuItem
} from '@mui/material';
import { IconSearch } from '@tabler/icons';

// third-party
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

// project imports
import Transitions from 'components/extended/Transitions';
import { updateSelectedBranch } from 'features/authentication/authActions';

import { shouldForwardProp } from '@mui/system';

// Styles
const PopperStyle = styled(Popper)(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-55px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

const OutlineInputStyle = styled(TextField)(({ theme }) => ({
  minWidth: 434,
  marginLeft: 16,
  // paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  }
}));

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

const SearchSection = () => {
  const theme = useTheme();
  const [value, setValue] = useState('Keelkattalai');
 
  const branches = useSelector((state) => state.auth.branches);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const dispatch = useDispatch();

  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                      <Card
                        sx={{
                          background: '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }}>
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch value={value} setValue={setValue} popupState={popupState} />
                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
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
