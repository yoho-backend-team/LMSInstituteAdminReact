import { Grid, TextField } from '@mui/material';
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

  const dispatch = useDispatch();

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllNotifications({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Grid></Grid>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item sm={5} xs={12}></Grid>
        <Grid item sm={4} xs={12}>
          <TextField value={searchValue} fullWidth placeholder="Search" onChange={(e) => handleSearch(e)} />
        </Grid>
        <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            All Notification
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
