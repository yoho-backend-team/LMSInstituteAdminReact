import { useNavigate } from 'react-router-dom'; 
import { Link } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const SubscriptionHeader = () => {
  const navigate = useNavigate(); 

 
  const handleHistory = () => {
    navigate('/payment-management/subscriptions/history');
  };

  return (
    <>
      <Box>
        <Box sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
          <Typography variant="h2">Subscription Plans</Typography>
          <Box sx={{ mt: 2.5, mb: 10.75 }}>
            <Typography sx={{ color: 'text.secondary' }}>
              All plans include 40+ advanced tools and features to boost your product.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Choose the best plan to fit your needs.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'end', mb: 2 }}>
          <Link component="button" variant="body1" onClick={handleHistory}>
            View History
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default SubscriptionHeader;
