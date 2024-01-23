// ** MUI Imports
import Box from '@mui/material/Box';
// ** Custom Component Import
import { TextField } from '@mui/material';
// import { useState } from 'react';
// import LiveClassAddModal from './add-LiveClass/LiveClassAddModal';

const StudentAttendanceCardHeader = (props) => {
  const { value, handleFilter } = props;
  //   const [isAddModalOpen, setAddModalOpen] = useState(false);

  //   const handleAddClose = () => {
  //     setAddModalOpen(false);
  //   };

//   const handleAdd = (itemId) => {
//     console.log('Add clicked for item ID:', itemId);
//     setAddModalOpen(true);
//   };
  return (
    <>
      <Box
        sx={{
          // p: 5,
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
          value={value}
          sx={{
            width: 400
          }}
          placeholder="Search Student"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </Box>
      {/* <LiveClassAddModal open={isAddModalOpen} handleAddClose={handleAddClose} /> */}
    </>
  );
};

export default StudentAttendanceCardHeader;
