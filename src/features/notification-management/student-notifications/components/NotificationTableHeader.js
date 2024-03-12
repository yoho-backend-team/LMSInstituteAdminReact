// ** MUI Imports
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// ** Icon Imports
import Icon from 'components/icon';
import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStudentNotifications } from '../redux/studentNotificationThunks';

const NotificationTableHeader = (props) => {
  // ** Props
  const { toggle } = props;

  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentNotifications({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
      // Dispatch action to fetch branches with search input
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
        <Grid item sm={6} xs={12}></Grid>
        <Grid item sm={4} xs={12}>
          <TextField 
            value={searchValue}
            fullWidth 
            placeholder="Search Sudent"
            onChange={(e) => handleSearch(e)} />
        </Grid>
        <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize="1.125rem" icon="tabler:plus" />
            Add Notification
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationTableHeader;
