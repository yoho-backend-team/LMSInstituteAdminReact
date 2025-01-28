import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import png from '../../../../assets/images/attendance/warden.png';
import { IconCalendarEvent } from '@tabler/icons';

const FilterCardDesign = ({ show, setShow, back }) => {
  const innerContainer = {
    background: '#FFFFFF', 
    borderRadius: '13px',
    padding: '15px',
    position: 'relative',
    width: '100%',
    height: '100%',
    background:"linear-gradient(to right,#2c3e50,#bdc3c7)" 
  };

  return (
    <Box>
      <Box style={innerContainer}>
        <Box style={{ display: 'flex', gap: 20, alignItems: 'center'}}>
          <IconCalendarEvent stroke={2} color='white'/>
          <Typography variant="h4" color="white">STUDENT ATTENDANCE</Typography>
          <Box style={{ position: 'absolute', right: 65, top: 2 }}>
            <img src={png} width={75} height={55} alt="warden" />
          </Box>
          <Button style={{ position: 'absolute', right: 15, backgroundColor: 'black', maxHeight: 1, width: '10' }} onClick={() => back()}>
            GO
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterCardDesign;
