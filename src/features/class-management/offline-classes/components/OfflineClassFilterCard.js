import Autocomplete from '@mui/material/Autocomplete';
import {Typography,InputAdornment,IconButton} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getAllBatches } from 'features/batch-management/batches/services/batchServices';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import DatePickerWrapper from 'styles/libs/react-datepicker';
import { setOfflineClasses } from '../redux/offlineClassSlice';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import { useInstitute } from 'utils/get-institute-details';
import { Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import OfflineClassCardHeader from './OfflineClassCardHeader';
import Icon from 'components/icon';


const OfflineClassFilterCard = ({ selectedBranchId, offlineClasses, offlineClassRefetch, setRefetch  }) => {
  const [statusValue, setStatusValue] = useState('');
  const dispatch = useDispatch();
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [search, setSearch] = useState(false);

  const handleFilterByStatus = (e) => {
    setStatusValue(e.target.value);
    const data = { status: e.target.value, branch_id: selectedBranchId };
    dispatch(getAllOfflineClasses(data));
  };

  const [batches, setBatches] = useState([]);
  useEffect(() => {
    const data = {
      branch_id: selectedBranchId
    };
    getBatches(data);
  }, [selectedBranchId]);

  const getBatches = async (data) => {
    const result = await getAllBatches(data);
    if (result?.success) {
      setBatches(result?.data);
    }
  };

  const handleBatchChange = (e, newValue) => {
    if (!newValue) {
      setSelectedBatch(null);
      const data = {
        branch: selectedBranchId,
        batch_id: '',
        institute: useInstitute().getInstituteId()
      };
      dispatch(getAllOfflineClasses(data));
    } else {
      setSelectedBatch(newValue);
      const data = {
        batch: newValue._id,
        branch: selectedBranchId,
        institute: useInstitute().getInstituteId()
      };
      dispatch(getAllOfflineClasses(data));
    }
  };
  // console.log(batches,"batches")

  //toggle filter card
  const [isCardOpen, setIsCardOpen] = useState(false);
  const filterCardRef = useRef(null);

  //toggle handler
  const handleToggleCard = (event) => {
    setIsCardOpen((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value.length === 0) {
      setSearch(false);
    }
  };

  const handleSearchSubmit = (value) => {
    const data = offlineClasses?.data?.filter((i) => i.class_name.toLowerCase().includes(value.toLowerCase()));
    if (data && data.length !== 0) {
      setSearch(true);
      dispatch(setOfflineClasses({ data }));
    }
  };


  return (
    <Grid>
      <Grid item xs={12}>
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <Box sx={{  position: 'relative', zIndex: 1000 ,display:'flex', alignItems:'center', gap:3}}>
          <Button
            variant="contained"
            size="medium"
            data-ignore-outside-click="true"
            sx={{ width: '130px', py: 1.6, borderRadius: 2, backgroundColor: '#0CCE7F', ':hover': { backgroundColor: '#0AA865' } }}
            onClick={(event) => {
              handleToggleCard(event);
            }}
          >
            <FilterListIcon /> {isCardOpen ? 'Hide' : 'Show Filter'}
          </Button>
          <Typography variant='h2'> Offline Class</Typography>
        </Box>
        <Box>
          <OfflineClassCardHeader/>
        </Box>

        </Box>
      </Grid>

      {isCardOpen && (
        <>
          <Box
            ref={filterCardRef}
            sx={{
              position: 'relative',
              top: '19%',
              left: '50%',

              transform: 'translateX(-50%)',
              zIndex: 999,
              width: '100%',
              
              borderRadius: 2,
              p: 3,
              
              overflowY: 'auto',
              maxHeight: '80vh',
              transition: 'left 0.3s ease'
            }}
          >
            <DatePickerWrapper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: '0 .25rem .875rem 0 rgba(38,43,67,.16)' }}>
                  
                    <CardContent>
                      <Grid container spacing={2}>
                        
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            fullWidth
                            value={statusValue}
                            onChange={(event, newValue) => handleFilterByStatus({ target: { value: newValue } })}
                            options={['Select Options', 'completed', 'pending']}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            fullWidth
                            options={batches}
                            filterSelectedOptions
                            onChange={handleBatchChange}
                            value={selectedBatch}
                            id="autocomplete-multiple-outlined"
                            getOptionLabel={(option) => option.batch_name || ''}
                            renderInput={(params) => <TextField {...params} label=" Batches" placeholder="Favorites" />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                      <TextField
                        value={searchValue}
                        fullWidth
                        placeholder="Search Class"
                        onChange={handleSearch}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {search ? (
                                <IconButton onClick={() => { setSearch(false); setSearchValue(''); setRefetch(!offlineClassRefetch); }}>
                                  <Icon icon="material-symbols:close" />
                                </IconButton>
                              ) : (
                                <IconButton onClick={() => handleSearchSubmit(searchValue)}>
                                  <Icon icon="material-symbols:search" />
                                </IconButton>
                              )}
                            </InputAdornment>
                          )
                        }}
                        label={
                          <>
                            {[..."Search Class"].map((char, index) => (
                              <span key={index} style={{ "--index": index }}>{char}</span>
                            ))}
                          </>
                        }
                      />
                    </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </DatePickerWrapper>
          </Box>
        </>
      )}
    </Grid>
  );
};

OfflineClassFilterCard.propTypes = {
  selectedBranchId: PropTypes.any
};

export default OfflineClassFilterCard;
