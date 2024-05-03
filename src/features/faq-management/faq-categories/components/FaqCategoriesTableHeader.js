import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFaqCategories } from '../redux/faqCategoryThunks';

const FaqCategoriesTableHeader = (props) => {
  const { toggle, selectedBranchId } = props;

  // State for search value
  const [searchValue, setSearchValue] = useState('');

  // Dispatch function
  const dispatch = useDispatch();

  // Callback function to handle search
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllFaqCategories({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
      <Grid item xs={12} sx={{ my: 3 }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item sm={5} xs={12}>
            <TextField
              value={searchValue}
              sx={{
                width: 400
              }}
              placeholder="Search Category"
              onChange={(e) => handleSearch(e)}
              readonly
            />
          </Grid>

          <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
            <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
              <Icon fontSize="1.125rem" icon="tabler:plus" />
              Add Faq Categories
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

FaqCategoriesTableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default FaqCategoriesTableHeader;
