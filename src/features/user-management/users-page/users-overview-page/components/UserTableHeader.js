import { Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../redux/userSlices';

const TableHeader = (props) => {
  const { toggle, selectedBranchId, users, setUserRefetch, userRefetch } = props;
  const [search, setSearch] = useState(false);

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  const handleSearchValueChange = (e) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);
  };

  // Callback function to handle search
  const handleSearch = useCallback(
    (value) => {
      const data = users?.filter((i) =>
        (i.first_name.toLowerCase() + i.last_name.toLowerCase()).includes(value.toLowerCase())
      );

      if (data) {
        setSearch(true);
        dispatch(setUsers({ data: data }));
      }
    },
    [dispatch, users]
  );

  return (
    <Grid container spacing={2} alignItems="center" sx={{ mt: 2, width: "120rem" }}>
      {/* Search Field */}
      <Grid item xs={12} md={8} lg={4}>
        <TextField
          value={searchValue}
          fullWidth
          placeholder="Search Admin User"
          onChange={(e) => handleSearchValueChange(e)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {search ? (
                  <IconButton
                    onClick={() => {
                      setUserRefetch(!userRefetch);
                      setSearchValue('');
                      setSearch(false);
                    }}
                  >
                    <Icon icon="material-symbols:close" fontSize="2rem" />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleSearch(searchValue)}>
                    <Icon icon="material-symbols:search" fontSize="2rem" />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

TableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any,
  users: PropTypes.array,
  setUserRefetch: PropTypes.func,
  userRefetch: PropTypes.bool,
};

export default TableHeader;

