import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SubscriptionHeader = () => {
  return (
    <Box sx={{ mt: 5, mb: 2, textAlign: 'center' }}>
      <Typography variant="h2">Subscription Plans</Typography>
      <Box sx={{ mt: 2.5, mb: 10.75 }}>
        <Typography sx={{ color: 'text.secondary' }}>All plans include 40+ advanced tools and features to boost your product.</Typography>
        <Typography sx={{ color: 'text.secondary' }}>Choose the best plan to fit your needs.</Typography>
      </Box>
    </Box>
  );
};

export default SubscriptionHeader;
