import { useEffect, useRef } from 'react';
import { Box, Button, Typography } from '@mui/material';
import NoDataImage from '../../assets/images/no-data/nodata.png';
import { getUserDetails } from 'utils/check-auth-state';

const NoDataFoundComponent = ({ title, description, buttonText, onAdd }) => {
  const componentRef = useRef(null);
  const user = getUserDetails();

  useEffect(() => {
    componentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <Box
      ref={componentRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f9f9f9',
        alignContent: 'center'
      }}
    >
      <Box sx={{ mb: 2 }}>
        <img
          src={NoDataImage}
          alt="no-data"
          style={{
            width: '200px',
            maxWidth: '100%',
            height: 'auto',
            objectFit: 'contain',
            padding: '0 10px'
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* <Typography variant="h1" gutterBottom>Hi, {user?.first_name + user?.last_name}!</Typography> */}
        <Typography component={'p'} sx={{ color: 'black', fontSize: '25px' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="black" mb={2}>
          {description}
        </Typography>
        <Button
          // variant="contained"
          // color="primary"
          onClick={onAdd}
          sx={{
            textTransform: 'none',
            width: '200px',
            borderRadius: '8px',
            padding: '12px 16px',
            background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
            boxShadow: `0 4px 15px rgba(0, 0, 0, 0.1)`,
            color: 'black',
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default NoDataFoundComponent;
