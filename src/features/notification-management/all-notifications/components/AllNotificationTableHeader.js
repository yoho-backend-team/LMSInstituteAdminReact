import { Grid, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotifications } from '../redux/allNotificationThunks';

const AllNotificationTableHeader = (props) => {
  const { toggle } = props;

  const [searchValue, setSearchValue] = useState('');
  const [showSearch, setShowSearch] = useState(false); 
  const dispatch = useDispatch();
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllNotifications({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch, selectedBranchId]
  );

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Grid container spacing={2} sx={{display: 'flex', justifyContent:'space-between',alignItems: 'center' }}>
        <Grid item sm={5} xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={() => setShowSearch(!showSearch)}
            sx={{ backgroundColor: 'action.selected' , color: 'primary.main', borderRadius: '10%', p: 1 , border: '1px solid' ,  transition: 'all 0.3s ease-in-out',
               }}
          >
            <Icon icon="tabler:search" fontSize="1.5rem" />
          </IconButton>
          {showSearch && (
            <TextField
              value={searchValue}
              fullWidth
              autoFocus
              placeholder="Search..."
              variant="outlined"
              onChange={handleSearch}
              sx={{ flex: 1 }}
            />
          )}
        </Grid>

        <Grid item sm={3} xs={12} sx={{ display: 'flex', justifyContent: 'flex-end',alignContent: 'end' ,}}>
          <Button onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Add Notification
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

AllNotificationTableHeader.propTypes = {
  toggle: PropTypes.any
};

export default AllNotificationTableHeader;
