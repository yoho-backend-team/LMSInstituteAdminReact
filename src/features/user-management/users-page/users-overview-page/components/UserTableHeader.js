import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../redux/userThunks';

const TableHeader = (props) => {
  const { toggle, selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      const data = {
        branch_id: selectedBranchId,
        search: searchInput
      };
      dispatch(getAllUsers(data));
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
      <Grid item sm={6} xs={12}></Grid>
      <Grid item sm={4} xs={12}>
        <TextField value={searchValue} fullWidth placeholder="Search Admin User" onChange={(e) => handleSearch(e)} />
      </Grid>
      <Grid item sm={2} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          Add Admin User
        </Button>
      </Grid>
    </Grid>
  );
};

TableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};
export default TableHeader;
