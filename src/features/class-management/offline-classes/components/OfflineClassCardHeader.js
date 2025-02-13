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

import { styled } from "@mui/material/styles";
const WaveTextField = styled(TextField)({
  position: "relative",
  width: "80%",
  "& label": {
    position: "absolute",
    left: "0px",
    top: "6px",  
    display: "flex",
    gap: "2px",
    fontSize: "18px", 
    color: "#999",
    pointerEvents: "none",
    transition: "0.3s ease all",
  },
  "& label span": {
    transition: "0.2s ease",
    transitionDelay: "calc(var(--index) * 0.05s)",
  },
  "& .MuiInputBase-root": {
    fontSize: "14px",  
    padding: "20px 5px 8px", 
    width: "100%",
    background: "transparent",
    position: "relative",
  },
  "& .MuiInputBase-input": {
    padding: "5px 0px",  
  },
  "& .MuiInputBase-input::placeholder": {
    color: "transparent",  
  },
  "& .MuiInputBase-input:focus ~ label span, & .MuiInputBase-input:not(:placeholder-shown) ~ label span": {
    transform: "translateY(-18px)",  
    fontSize: "13px",
    color: "#5264AE",
  },
  "& .MuiInputBase-root::after": {
    content: "''",
    height: "2px",
    width: "0%",
    position: "absolute",
    bottom: "0",
    left: "0",
    background: "#5264AE",  
    transition: "0.3s ease all",
  },
  "& .MuiInputBase-input:focus ~ .MuiInputBase-root::after": {
    width: "100%",
  },
});

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

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const handleAddClose = () => {
    setAddModalOpen(false);
  };
  const handleAdd = () => {
    setAddModalOpen(true);
  };

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
        <WaveTextField
          value={searchValue}
          sx={{
            width: '80%'
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
          label={
            <>
              {[..."Search Class"].map((char, index) => (
                <span key={index} style={{ "--index": index }}>{char}</span>
              ))}
            </>
          }
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Offline Class
          </Button>
        </Box>
      </Box>
      <OfflineClassAddModal setRefetch={setRefetch} open={isAddModalOpen} handleAddClose={handleAddClose} />
    </>
  );
};

OfflineClassCardHeader.propTypes = {
  selectedBranchId: PropTypes.any,
  setRefetch: PropTypes.any
};

export default OfflineClassCardHeader;
