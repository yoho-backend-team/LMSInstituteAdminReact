import { Grid, TextField, Typography, Box, Button, Autocomplete } from '@mui/material';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFaqCategories } from '../redux/faqCategoryThunks';
import Icon from 'components/icon';
// import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';


const FaqCategoriesTableHeader = (props) => {
  const { toggle, selectedBranchId, faqCategories } = props;

  const [searchValue, setSearchValue] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      dispatch(getAllFaqCategories({ search: searchInput, branch_id: selectedBranchId }));
    },
    [dispatch, selectedBranchId]
  );

  const handleFilterByCategory = (newValue) => {
    setFilterCategory(newValue);
    dispatch(
      getAllFaqCategories({
        category: newValue ? newValue.id : null,
        branch_id: selectedBranchId
      })
    );
  };

  const toggleFilters = () => setShowFilters((prev) => !prev);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 6,
            py: 2,
            mb: 0,
            boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)',
            background: '#fff',
            borderRadius: '8px'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Button
              onClick={toggleFilters}
              sx={{
                py: 1,
                px: 2,
                borderRadius: '50px',
                mr: 2,
                backgroundColor: '#f3f4f6',
                fontSize: { xs: '0.8rem', sm: '0.9rem' }
              }}
            >
              <FilterAltTwoToneIcon />
            </Button> */}
            <Typography variant="h2">FAQ Category</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'  }}>
          <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                value={searchValue}
                onChange={handleSearch}
                label="Search Category"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px'
                  },
                  '& fieldset': {
                    borderRadius: 50
                  }
                }}
              />
            </Grid>
            <Button
              onClick={toggle}
              variant="contained"
              sx={{
                '& svg': { mr: 2 },
                px: 3,
                py: 1.7,
                borderRadius: '50px',
                backgroundColor: '#0CCE7F',
                ':hover': { backgroundColor: '#0AA865' },
                fontSize: { xs: '0.8rem', sm: '0.9rem' }
              }}
            >
              <Icon fontSize="1.125rem" icon="tabler:plus" />
              Add FAQ Category
            </Button>
          </Box>
        </Box>

        {showFilters && (
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              boxShadow: 3,
              p: 1,
              pb: 3,
              gap: 10,
              ml: 1,
              mr: 1,
              mt: 1,
              borderRadius: '8px',
              backgroundColor: '#fff',
              width: 'calc(100% - 16px)',
              overflow: 'hidden'
            }}
          >
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                value={searchValue}
                onChange={handleSearch}
                label="Search Category"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px'
                  },
                  '& fieldset': {
                    borderRadius: 50
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                fullWidth
                value={filterCategory}
                onChange={(e, newValue) => handleFilterByCategory(newValue)}
                options={faqCategories}
                getOptionLabel={(option) => option.category_name || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Filter Category"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '50px'
                      },
                      '& fieldset': {
                        borderRadius: 50
                      }
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

FaqCategoriesTableHeader.propTypes = {
  toggle: PropTypes.func,
  selectedBranchId: PropTypes.any,
  faqCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category_name: PropTypes.string.isRequired
    })
  )
};

export default FaqCategoriesTableHeader;
