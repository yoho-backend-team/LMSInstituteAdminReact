import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Icon from 'components/icon';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import LiveClassAddModal from './add-LiveClass/LiveClassAddModal';
import { getAllLiveClasses } from '../redux/liveClassThunks';

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

const LiveClassCardHeader = (props) => {
  const { selectedBranchId, setRefetch } = props;

  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();
  const handleSearch = useCallback(
    (e) => {
      const searchInput = e.target.value;
      dispatch(getAllLiveClasses({ search: searchInput, branch_id: selectedBranchId }));
      setSearchValue(searchInput);
    },
    [dispatch]
  );

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
          
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Live Class
          </Button>
        </Box>
      </Box>
      <LiveClassAddModal setRefetch={setRefetch} open={isAddModalOpen} handleAddClose={handleAddClose} />
    </>
  );
};

LiveClassCardHeader.propTypes = {
  selectedBranchId: PropTypes.any,
  setRefetch: PropTypes.any
};

export default LiveClassCardHeader;
