import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import SubscriptionDetails from './SubscriptionDetails';

const SubscriptionPlans = (props) => {
  // ** Props
  const { plan, Subscriptions } = props;
  return (
    <Grid container spacing={6}>
      {Subscriptions?.map((item) => (
        <Grid item xs={12} md={4} key={item?.id}>
          <SubscriptionDetails plan={plan} data={item} />
        </Grid>
      ))}
    </Grid>
  );
};
SubscriptionFooter.propTypes = {
  plan: PropTypes.any,
  Subscriptions: PropTypes.any
};
export default SubscriptionPlans;
