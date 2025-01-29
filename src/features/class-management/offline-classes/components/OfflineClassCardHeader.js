import { TextField,Input,InputAdornment,IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllOfflineClasses } from '../redux/offlineClassThunks';
import { setOfflineClasses } from '../redux/offlineClassSlice';
import OfflineClassAddModal from './add-OfflineClass/OfflineClassAddModal';

const OfflineClassCardHeader = (props) => {
  const { selectedBranchId, setRefetch,offlineClasses ,offlineClassRefetch} = props;
  const [searchValue, setSearchValue] = useState('');
  const [search,setSearch] = useState(false)

  const dispatch = useDispatch();
  
  const handleSearch = (e) => {
      const searchInput = e.target.value;
      setSearchValue(searchInput);
      if(e.target.value.length===0){
        setSearch(false)
      }
  }

  const handleSearchSubmit = (value) => {
     const data = offlineClasses?.data?.filter((i)=>i.class_name.toLowerCase().includes(value.toLowerCase()))
     if(data && data.length !==0){
      setSearch(!search)
      dispatch(setOfflineClasses({data:data}))
     }
  }

  // const [isAddModalOpen, setAddModalOpen] = useState(false);
  // const handleAddClose = () => {
  //   setAddModalOpen(false);
  // };
  // const handleAdd = () => {
  //   setAddModalOpen(true);
  // };

  return (
    <>
      <Box
        sx={{
          pb: 1,
          pt: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TextField
          value={searchValue}
          sx={{
            width:" 100%"
          }}
          placeholder="Search Class"
          onChange={(e) => handleSearch(e)}
          InputProps={{
            endAdornment:(
             <InputAdornment position='end' >
              {
               search ? 
               <IconButton onClick={()=>{setSearch(!search);setSearchValue('');setRefetch(!offlineClassRefetch)}}>
                 <Icon icon={"material-symbols:close"}  />
               </IconButton>
               :
               <IconButton onClick={()=>handleSearchSubmit(searchValue)}>
                 <Icon icon={"material-symbols:search"} />
               </IconButton>
              }
             </InputAdornment>
            )
          }}
        />
        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Offline Class
          </Button>
        </Box> */}
      </Box>
      {/* <OfflineClassAddModal setRefetch={setRefetch} open={isAddModalOpen} handleAddClose={handleAddClose} /> */}
    </>
  );
};

OfflineClassCardHeader.propTypes = {
  selectedBranchId: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassCardHeader;
