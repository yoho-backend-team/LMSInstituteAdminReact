import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllStudentFeeRefunds } from '../redux/studentFeeRefundThunks';

const RefundCardHeader = (props) => {
  const { toggle, selectedBranchId } = props;
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllStudentFeeRefunds({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <>
      <Box
        sx={{
          px: 1,
          pb: 1,
          pt: 3,
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
          placeholder="Search Refund"
          onChange={(e) => handleSearch(e)}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={toggle} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Refund
          </Button>
        </Box>
      </Box>
    </>
  );
};

RefundCardHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};
export default RefundCardHeader;
