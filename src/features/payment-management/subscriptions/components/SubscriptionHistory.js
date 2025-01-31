import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import { selectUpgrade } from '../redux/selectors';

const SubscriptionHistory = () => {
  const upgradedPlan = useSelector(selectUpgrade);

  return (
    <Box sx={{ mt: 5, p: 3 }}>
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        Subscription History
      </Typography>
      {upgradedPlan.length > 0 ? (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h4" sx={{ textAlign: 'center' }}>Upgraded Plan Details:</Typography>
          <Grid container sx={{ mt: 2, border: '1px solid #ccc',mt:5}}>
            <Grid container item xs={12} sx={{ borderBottom: '2px solid #000', fontWeight: 'bold' }}>
              <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                Plan Name
              </Grid>
              <Grid item xs={3} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                Description
              </Grid>
              <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                Price
              </Grid>
              <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                Duration
              </Grid>
              <Grid item xs={3} sx={{ p: 1 }}>
                Status
              </Grid>
            </Grid>
            {upgradedPlan.map((item, index) => (
              <Grid container item xs={12} key={index} sx={{ border: '1px solid #ccc' }}>
                <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                  {item.identity}
                </Grid>
                <Grid item xs={3} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                  {item.description}
                </Grid>
                <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                  ₹{item.price}
                </Grid>
                <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', p: 1 }}>
                  {item.duration?.unit}
                </Grid>
                <Grid item xs={3} sx={{ p: 1 }}>
                  Processing
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }}>No upgraded plan found.</Typography>
      )}
    </Box>
  );
};

export default SubscriptionHistory;
