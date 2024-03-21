// ** MUI Imports
import Grid from '@mui/material/Grid';
// ** Custom Components Imports
import SubscriptionDetails from './SubscriptionDetails';

const SubscriptionPlans = (props) => {
  // ** Props
  const { plan,Subscriptions } = props;
  return (
    <Grid container spacing={6}>
    {Subscriptions.map((item) => (
      <Grid item xs={12} md={4} key={item?.data?.data?.id}>
        <SubscriptionDetails plan={plan} data={item?.data?.data} />
      </Grid>
    ))}
  </Grid>
  );
};

export default SubscriptionPlans;
