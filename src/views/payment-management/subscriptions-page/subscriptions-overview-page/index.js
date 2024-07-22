import { useState } from 'react';
import Card from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import SubscriptionDataTable from 'features/payment-management/subscriptions/components/SubscriptionDataTable';
import SubscriptionHeader from 'features/payment-management/subscriptions/components/SubscriptionHeader';
import SubscriptionPlans from 'features/payment-management/subscriptions/components/SubscriptionPlans';
import { selectSubscriptions } from 'features/payment-management/subscriptions/redux/selectors';
import { getSubscriptions } from 'features/payment-management/subscriptions/redux/thunks';
import { getAllSubscriptionPlans, getAllSubscriptions } from 'features/payment-management/subscriptions/services';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useInstitute } from 'utils/get-institute-details';

const CardContent = styled(MuiCardContent)(({ theme }) => ({
  padding: `${theme.spacing(2, 2)} !important`,
  [theme.breakpoints.down('xl')]: {
    padding: `${theme.spacing(2)} !important`
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(2, 5)} !important`
  }
}));


const Subscription = () => {
  const [refetch, setRefetch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const Subscription = useSelector(selectSubscriptions);
  const selectedBranchId = useSelector((state) => state.auth.selectedBranchId);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subscriptions = await getAllSubscriptionPlans();

        setSubscriptions(subscriptions?.data);
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(
      getSubscriptions({
        institute : useInstitute().getInstituteId()
      })
    );
  }, [dispatch, selectedBranchId, refetch]);


  
  return (
    <Card>
      <CardContent>
        <SubscriptionHeader />
        <SubscriptionDataTable Subscription={Subscription} />
        <SubscriptionPlans data={Subscription} Subscriptions={subscriptions} />

        {/* <Grid sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination count={10} color="primary" />
        </Grid> */}
      </CardContent>
    </Card>
  );
};

export default Subscription;
