import { Box, TextField, Typography, Button } from '@mui/material';
import React from 'react';
import png from '../../../../assets/images/attendance/warden.png';
import { IconCalendarEvent,IconX } from '@tabler/icons';

const FilterDesignCard = ({  go }) => {
  
  const innerContainer = {
    background: '#FFFFFF',
    borderRadius: '13px',
    padding: '15px',
    position: 'relative',
    width: '100%',
    height: '100%',
    background:"linear-gradient(to right,#536976,#292E49)"
  };

  return (
    <Box>
      <Box>
        <Box style={innerContainer}>
          <Box style={{ display: 'flex', gap: 20, alignItems: 'center', paddingLeft: 10 }}>
            {/* <Button>
              <IconX height={10}/>
            </Button> */}
            <IconCalendarEvent stroke={2} color="white"/>
            <Typography variant="h4" color="white">Filter</Typography>
            <Box style={{ position: 'absolute', right: 87, top: 2 }}>
              <img src={png} width={75} height={55} alt="warden" />
            </Box>
            <Button style={{ position: 'absolute', right: 54, backgroundColor: 'black',color:'white', maxHeight: 1, width: 10 }} onClick={() => go()}>
              GO
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterDesignCard;
