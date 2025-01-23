import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Autocomplete, Typography } from '@mui/material';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAllFaqs } from '../redux/faqThunks';
import { Controller, useForm } from 'react-hook-form';

const FaqTableHeader = (props) => {
  const { toggle, selectedBranchId, } = props;
  const { faqCategories } = props;

  const { control, formState: { errors } } = useForm();

  const [searchValue, setSearchValue] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const handleSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleApplyFilters = () => {
    console.log("filter condition works")
    const searchData = { search: searchValue, branch_id: selectedBranchId };
    dispatch(getAllFaqs(searchData));
    console.log("search details ", searchData);
    setOpenDialog(false);
  };
  console.log(faqCategories)
  return (
    <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', display: 'flex' }}>
      {/* Page Title */}
      <Grid item xs={12} sx={{ mb: 3 ,alignItems:'center' , justifyContent: 'center' , display: 'flex'}}>
        <Typography variant="h4" component="h1">
          FAQs
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ my: 3 }}>
        <Grid container spacing={4} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item>
            <Button onClick={() => setOpenDialog(true)} variant="outlined">
              <Icon fontSize="1.125rem" icon="tabler:search" />
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
              <Icon fontSize="1.125rem" icon="tabler:plus" />
              Add FAQ Categories
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Dialog for Search and Filter */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Search and Filter FAQs</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search FAQs"
            sx={{ mb: 2 }}
          />
          <Grid item xs={12} sm={12}>
            <Controller
              name="Filter category"
              control={control}
              render={({ field: { onChange } }) => (
                <Autocomplete
                  fullWidth
                  sx={{ mb: 2 }}
                  getOptionLabel={(option) => option.category_name}
                  onChange={(e, newValue) => {
                    onChange(newValue);
                  }}
                  options={faqCategories}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Filter Category"
                      error={Boolean(errors.category)}
                      helperText={errors.category?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

FaqTableHeader.propTypes = {
  toggle: PropTypes.func,
  selectedBranchId: PropTypes.any,
  faqCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category_name: PropTypes.string.isRequired,
    })
  ),
};

export default FaqTableHeader;