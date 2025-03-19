import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Icon from 'components/icon';
import CustomChip from 'components/mui/chip';
import PropTypes from 'prop-types';
import { hexToRGBA } from 'utils/hex-to-rgba';
import { getImageUrl } from 'utils/imageUtils';
import { imagePlaceholder } from 'utils/placeholders';
import { useState } from "react";
import axios from "axios";


// ** Styled Component for the wrapper of whole component
const BoxWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(6),
  paddingTop: theme.spacing(16),
  borderRadius: theme.shape.borderRadius
}));

// ** Styled Component for the wrapper of all the features of a plan
const BoxFeature = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& > :not(:last-child)': {
    marginBottom: theme.spacing(2.5)
  }
}));

const SubscriptionDetails = (props) => {
  // ** Props
  const { data ,plan} = props;

console.log(JSON.stringify(data)+"the data sis");

  const instituteId = plan?.[0]?.instituteId?._id;
  const cancelled = plan?.[0]?.instituteId?.is_cancelled;

console.log("Institute ID is:", instituteId,cancelled);

const [pendingSubscription, setPendingSubscription] = useState(null); // Track pending subscription
const [isAnyPending, setIsAnyPending] = useState(false); // Track if any button is pending


const handleUpgrade = async(subscriptionId) => {
  
  if (isAnyPending) {
    console.log("A request is already pending. Blocking new request.");
    return;
  }
  setIsAnyPending(true); // Prevent any new requests

  console.log("Selected Subscription ID:", subscriptionId);
  console.log("Institute pending is:", isAnyPending);


  setPendingSubscription(subscriptionId); // Set only this subscription as "Pending"

  try {
    const response = await axios.post(
      `http://localhost:3002/api/subscription/institute/upgrade-subscription/${instituteId}/request`,
      {
        "id":subscriptionId
    }
    );
    setIsAnyPending(true); // Now it properly prevents new requests

    console.log("Upgrade successful:", response.data);

    // After a successful response, the button should stay as "Pending"
  } catch (error) {
    console.error("Upgrade failed:", error.response.data.message);
    setPendingSubscription(null); // Reset if API call fails
    setIsAnyPending(false);
    alert( error.response.data.message)

  }


  // Now you can use this subscriptionId to make an API call
};

  const renderFeatures = () => {
    if (!Array.isArray(data?.features)) {
      return null;
    }
    
    return data.features.map((item, index) => (
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="span" sx={{ display: 'inline-flex', color: 'text.secondary', mr: 2.5 }}>
          <Icon icon="tabler:circle" fontSize="0.875rem" />
        </Box>
        <Typography sx={{ color: 'text.secondary' }}>{item?.feature?.identity}</Typography>
      </Box>
    ));
  };

  return (
    <BoxWrapper
      sx={{
        border: (theme) =>
          !data?.is_popular ? `1px solid ${theme.palette.divider}` : `1px solid ${hexToRGBA(theme.palette.primary.main, 0.5)}`
      }}
    >
      {data?.is_popular ? (
        <CustomChip
          rounded
          size="small"
          skin="light"
          label="Popular"
          color="primary"
          sx={{
            top: 24,
            right: 24,
            position: 'absolute',
            '& .MuiChip-label': {
              px: 1.75,
              fontWeight: 500,
              fontSize: '0.75rem'
            }
          }}
        />
      ) : null}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <img width={"200px"} height={"200px"} src={`${data?.image?getImageUrl(data?.image):imagePlaceholder}`} alt={`${data?.identity}-plan-img`} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ mb: 1.5, fontWeight: 500, lineHeight: 1.385, fontSize: '1.625rem' }}>{data?.identity}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{data?.description}</Typography>
        <Box sx={{ my: 7, position: 'relative' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{ mt: 2.5, mr: 0.5, fontWeight: 500, color: 'primary.main', alignSelf: 'flex-start' }}>₹</Typography>
            <Typography variant="h1" sx={{ color: 'primary.main', fontSize: '3rem', lineHeight: 1.4168 }}>
              {data?.price}
            </Typography>
            <Typography sx={{ mb: 1.5, alignSelf: 'flex-end', color: 'text.disabled' }}>/{data?.duration?.unit}</Typography>
          </Box>
        </Box>
      </Box>
      <BoxFeature>{renderFeatures()}</BoxFeature>
      {/* <Button fullWidth color={data?.currentPlan ? 'success' : 'primary'} variant={data?.popularPlan ? 'contained' : 'tonal'}>
        {data?._id === plan?.[0]?.subscriptionId?._id ? 'Your  Plan' : 'Upgrade'}
      </Button> */}
      {/* <Button
  fullWidth
  color={data?.currentPlan ? "success" : "primary"}
  variant={data?.popularPlan ? "contained" : "tonal"}
  onClick={() => handleUpgrade(data?._id)}
>
  {data?._id === plan?.[0]?.subscriptionId?._id ? "Your Plan" : "Upgrade"}
</Button> */}
<Button
  fullWidth
  color={data?.currentPlan ? "success" : "primary"}
  variant={data?.popularPlan ? "contained" : "tonal"}
  onClick={() => handleUpgrade(data?._id)}
  // disabled={pendingSubscription === data?._id}
  disabled={
    data?._id === plan?.[0]?.subscriptionId?._id || // Disable if it's the current plan
    isAnyPending // Disable if another request is pending
  }>
  {pendingSubscription === data?._id ? "Pending..." : data?._id === plan?.[0]?.subscriptionId?._id ? "Your Plan" : "Upgrade"}
</Button>

    </BoxWrapper>
  );
};

SubscriptionDetails.propTypes = {
  data: PropTypes.any
};
export default SubscriptionDetails;
