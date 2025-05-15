import { Grid, TextField ,InputAdornment } from '@mui/material';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllHelpCenterDetails } from '../redux/HelpThunks';
import { useInstitute } from 'utils/get-institute-details';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

const HlepCenterTableHeader = (props) => {
  const navigate=useNavigate()
  const { toggle, selectedBranchId } = props;


  const [searchValue, setSearchValue] = useState('');

  
  const dispatch = useDispatch();

  
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllHelpCenterDetails({ search: searchInput, branch_id: selectedBranchId, instituteid: useInstitute().getInstituteId(), }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

  return (
    <Grid container spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
      <Grid item xs={12} sx={{ my: 3 }}>
        <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant='contained' sx={{ml:2}} onClick={()=>navigate('/help-center/help-faqs')}><IconArrowLeft stroke={2}/></Button>
          <Grid item sm={5} xs={12}>
            <TextField
              value={searchValue}
              sx={{
                width: 400
              }}
              placeholder="Search Category"
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon fontSize="1.125rem" icon="tabler:search" />
                  </InputAdornment>
                ),
              }}
              // readonly
            />
          </Grid>

          <Grid item sm={3} xs={12} sx={{ justifyContent: 'flex-end', alignItems: 'flex-end', mt: 1 }}>
            <Button fullWidth onClick={toggle} variant="contained" sx={{ '& svg': { mr: 2 } }}>
              <Icon fontSize="1.125rem" icon="tabler:plus" />
              Add Question
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

HlepCenterTableHeader.propTypes = {
  toggle: PropTypes.any,
  selectedBranchId: PropTypes.any
};

export default HlepCenterTableHeader;
