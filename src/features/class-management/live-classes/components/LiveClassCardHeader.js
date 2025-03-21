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
        {/* <TextField
          value={searchValue}
          sx={{
            width: "80%"
          }}
          placeholder="Search Class"
          onChange={(e) => handleSearch(e)}
          label={
            <>
              {[..."Search Class"].map((char, index) => (
                <span key={index} style={{ "--index": index }}>{char}</span>
              ))}
            </>
          }
        /> */}

         
        

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', mt: { xs: 3, sm: 0 } }}>
          <Button onClick={() => handleAdd()} variant="contained" color="primary" startIcon={<Icon icon="tabler:plus" />}>
            Add Live Class
          </Button>
        </Box>
      </Box>
      <LiveClassAddModal setRefetch={setRefetch}  open={isAddModalOpen} handleAddClose={handleAddClose} />
    </>
  );
};

LiveClassCardHeader.propTypes = {
  selectedBranchId: PropTypes.any,
  setRefetch: PropTypes.any
};

export default LiveClassCardHeader;
